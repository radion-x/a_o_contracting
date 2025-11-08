/**
 * Chat Popup Manager
 * Handles UI interactions, state management, and coordination with OpenRouter API
 */

class ChatPopup {
    constructor(apiKey, config = {}) {
        this.apiKey = apiKey;
        this.config = {
            model: config.model || 'deepseek/deepseek-chat',
            maxMessages: config.maxMessages || 50,
            useStreaming: config.useStreaming !== false,
            ...config
        };

        this.api = new OpenRouterAPI(apiKey);
        this.api.setModel(this.config.model);
        if (this.config.systemPrompt) {
            this.api.setSystemPrompt(this.config.systemPrompt);
        }
        this.isOpen = false;
        this.isLoading = false;

        this.init();
    }

    /**
     * Initialize chat popup
     */
    init() {
        // Create HTML structure
        this.createHTML();

        // Get DOM elements
        this.elements = {
            toggleBtn: document.querySelector('.chat-toggle-btn'),
            container: document.querySelector('.chat-container'),
            header: document.querySelector('.chat-header-title'),
            messagesArea: document.querySelector('.chat-messages'),
            form: document.querySelector('.chat-input-form'),
            input: document.querySelector('.chat-input'),
            sendBtn: document.querySelector('.chat-send-btn'),
            typingIndicator: document.querySelector('.typing-indicator'),
            closeBtn: document.querySelector('.chat-header-btn'),
        };

        // Bind events
        this.bindEvents();

        // Display welcome message
        this.showWelcomeMessage();
    }

    /**
     * Create chat popup HTML structure
     */
    createHTML() {
        const chatHTML = `
            <!-- Chat Toggle Button -->
            <button class="chat-toggle-btn" title="Open Chat">
                <i class="fas fa-comments"></i>
            </button>

            <!-- Chat Container -->
            <div class="chat-container">
                <!-- Chat Header -->
                <div class="chat-header">
                    <div class="chat-header-info">
                        <span class="chat-status-dot"></span>
                        <div class="chat-header-title">
                            <h3>AI Assistant</h3>
                            <span class="chat-header-subtitle">A & O Contracting</span>
                        </div>
                    </div>
                    <div class="chat-header-actions">
                        <button class="chat-header-btn" title="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- Messages Area -->
                <div class="chat-messages"></div>

                <!-- Typing Indicator -->
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>

                <!-- Input Area -->
                <div class="chat-input-wrapper">
                    <form class="chat-input-form">
                        <textarea
                            class="chat-input"
                            placeholder="Type your message..."
                            rows="1"
                        ></textarea>
                        <button type="submit" class="chat-send-btn">
                            <span>Send</span>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Insert into page
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Toggle chat window
        this.elements.toggleBtn.addEventListener('click', () => this.toggle());
        this.elements.closeBtn?.addEventListener('click', () => this.close());

        // Form submission
        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Auto-expand textarea
        this.elements.input.addEventListener('input', () => this.autoExpandTextarea());

        // Enter to send (Shift+Enter for new line)
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Scroll to bottom when new messages arrive
        const observer = new MutationObserver(() => {
            this.scrollToBottom();
        });
        observer.observe(this.elements.messagesArea, { childList: true });
    }

    /**
     * Auto-expand textarea based on content
     */
    autoExpandTextarea() {
        const textarea = this.elements.input;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    /**
     * Toggle chat window visibility
     */
    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    /**
     * Open chat window
     */
    open() {
        this.isOpen = true;
        this.elements.container.classList.add('show');
        this.elements.toggleBtn.classList.add('active');
        this.elements.input.focus();
    }

    /**
     * Close chat window
     */
    close() {
        this.isOpen = false;
        this.elements.container.classList.remove('show');
        this.elements.toggleBtn.classList.remove('active');
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        const welcomeHTML = `
            <div class="welcome-message">
                <h4>Welcome</h4>
                <p>How can we assist you with our demolition and waste removal services?</p>
                <div class="quick-actions">
                    <button class="quick-action-btn" data-action="services">View Services</button>
                    <button class="quick-action-btn" data-action="pricing">Get a Quote</button>
                    <button class="quick-action-btn" data-action="contact">Contact Us</button>
                </div>
            </div>
        `;
        this.elements.messagesArea.innerHTML = welcomeHTML;

        // Bind quick action buttons
        this.elements.messagesArea.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    /**
     * Handle quick action button clicks
     * @param {string} action - Action type
     */
    handleQuickAction(action) {
        const messages = {
            services: 'Tell me about your services',
            pricing: 'How can I request a quote?',
            contact: 'How can I contact you?'
        };
        this.elements.input.value = messages[action] || '';
        this.sendMessage();
    }

    /**
     * Send user message
     */
    async sendMessage() {
        const message = this.elements.input.value.trim();

        if (!message || this.isLoading) return;

        // Clear input
        this.elements.input.value = '';
        this.elements.input.style.height = 'auto';

        // Add user message to UI
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator(true);
        this.isLoading = true;
        this.elements.sendBtn.disabled = true;

        try {
            let aiResponse;

            if (this.config.useStreaming) {
                aiResponse = await this.getStreamingResponse(message);
            } else {
                aiResponse = await this.api.sendMessage(message);
                this.addMessage(aiResponse, 'assistant');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            this.addErrorMessage(error.message);
        } finally {
            this.showTypingIndicator(false);
            this.isLoading = false;
            this.elements.sendBtn.disabled = false;
            this.elements.input.focus();
        }
    }

    /**
     * Get streaming response from API
     * @param {string} message - User message
     * @returns {Promise<string>} Full response
     */
    async getStreamingResponse(message) {
        return new Promise((resolve, reject) => {
            let messageContainer;
            let fullResponse = '';

            this.api.sendMessageStream(
                message,
                (chunk) => {
                    fullResponse += chunk;

                    // Create message container if doesn't exist
                    if (!messageContainer) {
                        const now = new Date();
                        messageContainer = document.createElement('div');
                        messageContainer.className = 'message assistant';
                        messageContainer.innerHTML = `
                            <div class="message-bubble">
                                <div class="message-content"></div>
                                <span class="message-time">${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        `;
                        this.elements.messagesArea.appendChild(messageContainer);
                    }

                    // Update message content with parsed markdown
                    messageContainer.querySelector('.message-content').innerHTML = this.parseMarkdown(fullResponse);
                    this.scrollToBottom();
                },
                (error) => {
                    reject(error);
                }
            ).then(() => {
                resolve(fullResponse);
            });
        });
    }

    /**
     * Add message to chat UI
     * @param {string} content - Message content
     * @param {string} sender - 'user' or 'assistant'
     */
    addMessage(content, sender) {
        // Clear welcome message if first message
        if (this.elements.messagesArea.querySelector('.welcome-message')) {
            this.elements.messagesArea.innerHTML = '';
        }

        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const messageHTML = `
            <div class="message ${sender}">
                <div class="message-bubble">
                    <div class="message-content">${this.escapeHTML(content)}</div>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        this.elements.messagesArea.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    /**
     * Add error message to chat
     * @param {string} message - Error message
     */
    addErrorMessage(message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const errorHTML = `
            <div class="message assistant">
                <div class="message-bubble error-message-bubble">
                    <div class="message-content">
                        ❌ ${this.escapeHTML(message)}
                    </div>
                    <button class="retry-btn">Retry</button>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        this.elements.messagesArea.insertAdjacentHTML('beforeend', errorHTML);
        this.scrollToBottom();
    }

    /**
     * Add system message
     * @param {string} message - System message
     */
    showSystemMessage(message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const systemHTML = `
            <div style="text-align: center; margin: 15px 0; opacity: 0.7; font-size: 12px;">
                <i class="fas fa-info-circle"></i> ${this.escapeHTML(message)}
                <span style="display: block; color: var(--light-text);">${time}</span>
            </div>
        `;

        this.elements.messagesArea.insertAdjacentHTML('beforeend', systemHTML);
        this.scrollToBottom();
    }

    /**
     * Show/hide typing indicator
     * @param {boolean} show - Whether to show indicator
     */
    showTypingIndicator(show) {
        if (show) {
            this.elements.typingIndicator.classList.add('show');
            this.scrollToBottom();
        } else {
            this.elements.typingIndicator.classList.remove('show');
        }
    }

    /**
     * Scroll message area to bottom
     */
    scrollToBottom() {
        setTimeout(() => {
            this.elements.messagesArea.scrollTop = this.elements.messagesArea.scrollHeight;
        }, 0);
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Parse markdown to HTML
     * @param {string} markdown - Markdown text
     * @returns {string} HTML
     */
    parseMarkdown(markdown) {
        // Escape HTML first for security
        let html = this.escapeHTML(markdown);

        // Code blocks (```code```) - must be before inline code
        html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

        // Inline code (`code`)
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Headings (must be before bold)
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

        // Bold (**text** or __text__) - must be before italic
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic (*text* or _text_)
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');

        // Links [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

        // Convert newlines to <br> first
        html = html.replace(/\n/g, '<br>');

        // Lists - handle both numbered (1., 2., 3.) and bullet (-)
        const lines = html.split('<br>');
        let inOrderedList = false;
        let inUnorderedList = false;
        let result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Numbered list (1. 2. 3. etc)
            if (line.match(/^\d+\.\s+(.+)/)) {
                if (!inOrderedList) {
                    if (inUnorderedList) {
                        result.push('</ul>');
                        inUnorderedList = false;
                    }
                    result.push('<ol>');
                    inOrderedList = true;
                }
                result.push(line.replace(/^\d+\.\s+(.+)/, '<li>$1</li>'));
            }
            // Bullet list (- )
            else if (line.match(/^-\s+(.+)/)) {
                if (!inUnorderedList) {
                    if (inOrderedList) {
                        result.push('</ol>');
                        inOrderedList = false;
                    }
                    result.push('<ul>');
                    inUnorderedList = true;
                }
                result.push(line.replace(/^-\s+(.+)/, '<li>$1</li>'));
            }
            // Regular line
            else {
                if (inOrderedList) {
                    result.push('</ol>');
                    inOrderedList = false;
                }
                if (inUnorderedList) {
                    result.push('</ul>');
                    inUnorderedList = false;
                }
                if (line) {
                    result.push(line);
                }
            }
        }

        // Close any open lists
        if (inOrderedList) result.push('</ol>');
        if (inUnorderedList) result.push('</ul>');

        html = result.join('<br>');

        return html;
    }

    /**
     * Clear chat history
     */
    clearHistory() {
        this.api.clearHistory();
        this.showWelcomeMessage();
    }

    /**
     * Get chat history
     * @returns {Array} Conversation history
     */
    getHistory() {
        return this.api.conversationHistory;
    }
}

// Export for global use
window.ChatPopup = ChatPopup;
