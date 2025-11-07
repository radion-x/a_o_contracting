/**
 * OpenRouter API Integration
 * Handles communication with OpenRouter API for AI chat responses
 * Model-agnostic design allows easy switching between different models
 */

class OpenRouterAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // Use backend proxy if apiKey is 'BACKEND_PROXY', otherwise call OpenRouter directly
        this.useBackendProxy = (apiKey === 'BACKEND_PROXY');
        this.apiUrl = this.useBackendProxy
            ? '/api/chat.php'
            : 'https://openrouter.ai/api/v1/chat/completions';
        this.model = 'deepseek/deepseek-chat'; // Default model
        this.conversationHistory = [];
        this.maxTokens = 1000;
        this.temperature = 0.7;
        this.systemPrompt = null; // Will be set during initialization
    }

    /**
     * Set the AI model to use
     * @param {string} modelId - Model identifier (e.g., 'deepseek/deepseek-chat', 'openai/gpt-4')
     */
    setModel(modelId) {
        this.model = modelId;
    }

    /**
     * Set the system prompt
     * @param {string} prompt - System prompt to use
     */
    setSystemPrompt(prompt) {
        this.systemPrompt = prompt;
        // Add system message as first message if not already present
        if (this.conversationHistory.length === 0 || this.conversationHistory[0].role !== 'system') {
            this.conversationHistory.unshift({ role: 'system', content: prompt });
        } else {
            // Update existing system message
            this.conversationHistory[0].content = prompt;
        }
    }

    /**
     * Get available models
     * @returns {Array} List of available models
     */
    getAvailableModels() {
        return [
            { id: 'deepseek/deepseek-r1-0528-qwen3-8b:free', name: 'DeepSeek R1 (Free)' },
            { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat' },
            { id: 'openai/gpt-4', name: 'GPT-4' },
            { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
            { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' },
            { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
            { id: 'google/gemini-pro', name: 'Gemini Pro' },
            { id: 'meta-llama/llama-2-70b-chat', name: 'Llama 2 70B' }
        ];
    }

    /**
     * Reset conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
    }

    /**
     * Add message to conversation history
     * @param {string} role - 'user' or 'assistant'
     * @param {string} content - Message content
     */
    addToHistory(role, content) {
        this.conversationHistory.push({ role, content });
    }

    /**
     * Send message to OpenRouter API and get response
     * @param {string} userMessage - User's message
     * @returns {Promise<string>} AI response
     */
    async sendMessage(userMessage) {
        try {
            // Add user message to history
            this.addToHistory('user', userMessage);

            // Prepare request payload
            const payload = {
                messages: this.conversationHistory,
            };

            // Prepare headers
            const headers = {
                'Content-Type': 'application/json',
            };

            // Only add auth header if calling OpenRouter directly
            if (!this.useBackendProxy) {
                headers['Authorization'] = `Bearer ${this.apiKey}`;
                headers['HTTP-Referer'] = window.location.href;
                headers['X-Title'] = 'AO Contract Chat';
                // Include model config when calling directly
                payload.model = this.model;
                payload.max_tokens = this.maxTokens;
                payload.temperature = this.temperature;
                payload.top_p = 0.95;
            }

            // Make API request
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });

            // Handle API errors
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            // Parse response
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            // Add assistant response to history
            this.addToHistory('assistant', assistantMessage);

            return assistantMessage;
        } catch (error) {
            console.error('OpenRouter API Error:', error);
            throw error;
        }
    }

    /**
     * Send message with streaming (for real-time responses)
     * @param {string} userMessage - User's message
     * @param {Function} onChunk - Callback for each streamed chunk
     * @param {Function} onError - Callback for errors
     */
    async sendMessageStream(userMessage, onChunk, onError) {
        try {
            // Add user message to history
            this.addToHistory('user', userMessage);

            // Prepare request payload
            const payload = {
                messages: this.conversationHistory,
                stream: true,
            };

            // Prepare headers
            const headers = {
                'Content-Type': 'application/json',
            };

            // Only add auth header if calling OpenRouter directly
            if (!this.useBackendProxy) {
                headers['Authorization'] = `Bearer ${this.apiKey}`;
                headers['HTTP-Referer'] = window.location.href;
                headers['X-Title'] = 'AO Contract Chat';
                // Include model config when calling directly
                payload.model = this.model;
                payload.max_tokens = this.maxTokens;
                payload.temperature = this.temperature;
                payload.top_p = 0.95;
            }

            // Make API request
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });

            // Handle API errors
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            // Process stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullMessage = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.slice(6);
                        if (jsonStr === '[DONE]') continue;

                        try {
                            const json = JSON.parse(jsonStr);
                            const content = json.choices[0].delta?.content || '';
                            fullMessage += content;
                            onChunk(content);
                        } catch (e) {
                            // Skip malformed JSON lines
                        }
                    }
                }
            }

            // Add assistant response to history
            this.addToHistory('assistant', fullMessage);

            return fullMessage;
        } catch (error) {
            console.error('OpenRouter Streaming Error:', error);
            onError(error);
            throw error;
        }
    }

    /**
     * Validate API key
     * @returns {Promise<boolean>} True if API key is valid
     */
    async validateApiKey() {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get API usage statistics
     * @returns {Promise<Object>} Usage statistics
     */
    async getUsage() {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Failed to fetch usage:', error);
        }
        return null;
    }
}

// Export for use in other scripts
window.OpenRouterAPI = OpenRouterAPI;
