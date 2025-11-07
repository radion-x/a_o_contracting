/**
 * Chat Popup Configuration Example
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new file called 'chat-config.js' (copy this file)
 * 2. Add your OpenRouter API key
 * 3. Customize the chat settings as needed
 * 4. Include this file in your HTML after chat-popup.js
 * 
 * DO NOT commit chat-config.js to version control (add to .gitignore)
 */

// Chat Configuration Object
const CHAT_CONFIG = {
    // === REQUIRED: OpenRouter API Key ===
    // Get your API key from https://openrouter.ai/keys
    // Never expose this in client-side code in production!
    apiKey: 'YOUR_OPENROUTER_API_KEY',
    
    // === MODEL SELECTION ===
    // Available models (change this to use different models):
    // - 'deepseek/deepseek-chat' (Default - Fast and efficient)
    // - 'openai/gpt-4' (Most capable but more expensive)
    // - 'openai/gpt-3.5-turbo' (Quick and affordable)
    // - 'anthropic/claude-3-opus' (Very capable)
    // - 'anthropic/claude-3-sonnet' (Balanced)
    // - 'google/gemini-pro' (Google's model)
    // - 'meta-llama/llama-2-70b-chat' (Open source)
    model: 'deepseek/deepseek-chat',
    
    // === STREAMING ===
    // Enable real-time streaming responses (recommended for better UX)
    useStreaming: true,
    
    // === TOKEN LIMITS ===
    // Maximum tokens for each response
    maxTokens: 1000,
    
    // === MODEL TEMPERATURE ===
    // Controls response creativity (0.0 = deterministic, 1.0 = creative)
    temperature: 0.7,
    
    // === UI CUSTOMIZATION ===
    ui: {
        // Show/hide model selector dropdown
        showModelSelector: true,
        
        // Chat position on screen ('bottom-right', 'bottom-left', 'top-right', 'top-left')
        position: 'bottom-right',
        
        // Custom welcome message
        welcomeTitle: 'AI Assistant',
        welcomeSubtitle: 'Powered by DeepSeek',
        welcomeMessage: "I'm here to help answer your questions about our services and contracts.",
    },
    
    // === ERROR HANDLING ===
    errorHandling: {
        // Show retry button on errors
        showRetryButton: true,
        
        // Auto-retry failed requests
        autoRetry: false,
    },
};

// Initialize Chat Popup when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if API key is configured
    if (CHAT_CONFIG.apiKey === 'YOUR_OPENROUTER_API_KEY') {
        console.warn('⚠️ Chat Popup: API key not configured. Please set your OpenRouter API key in chat-config.js');
        return;
    }
    
    // Create chat popup instance
    window.chatPopup = new ChatPopup(CHAT_CONFIG.apiKey, {
        model: CHAT_CONFIG.model,
        useStreaming: CHAT_CONFIG.useStreaming,
        maxTokens: CHAT_CONFIG.maxTokens,
        temperature: CHAT_CONFIG.temperature,
    });
    
    console.log('✅ Chat Popup initialized successfully');
    console.log('🔧 Current Model:', CHAT_CONFIG.model);
});

/**
 * ============================================
 * ADVANCED CONFIGURATION
 * ============================================
 * 
 * To use this config file:
 * 
 * 1. Rename this file from 'chat-config.example.js' to 'chat-config.js'
 * 2. Add your OpenRouter API key where it says 'YOUR_OPENROUTER_API_KEY'
 * 3. Add this line to your HTML after chat-popup.js:
 *    <script src="chat-config.js"></script>
 * 
 * 4. Remove or comment out the initialization script in index.html
 * 
 * 
 * ============================================
 * SWITCHING MODELS
 * ============================================
 * 
 * To switch models, simply change the 'model' property:
 * 
 *   model: 'openai/gpt-4'  // Switch to GPT-4
 * 
 * Then reload the page. All code will remain the same - only the model changes!
 * This demonstrates the model-agnostic design of the chat system.
 * 
 * 
 * ============================================
 * ENVIRONMENT CONFIGURATION
 * ============================================
 * 
 * For production, consider loading the API key from:
 * - Environment variables
 * - A secure backend endpoint
 * - A secrets management system
 * 
 * Example using fetch from a backend:
 * 
 *   fetch('/api/chat-config')
 *       .then(res => res.json())
 *       .then(config => {
 *           window.chatPopup = new ChatPopup(config.apiKey, {
 *               model: config.model,
 *               useStreaming: config.useStreaming,
 *           });
 *       });
 * 
 * 
 * ============================================
 * TROUBLESHOOTING
 * ============================================
 * 
 * Q: Chat popup doesn't appear?
 * A: Check browser console for errors. Ensure API key is set and valid.
 * 
 * Q: Getting API errors?
 * A: 
 *    - Verify your OpenRouter API key is correct
 *    - Check your account has credit
 *    - Ensure the model name is spelled correctly
 * 
 * Q: Want to use a different model?
 * A: Just change the 'model' property and reload. No other code changes needed!
 * 
 * Q: How do I get an OpenRouter API key?
 * A: Visit https://openrouter.ai/keys and sign up for a free account
 */
