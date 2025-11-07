# Chat Popup Setup - Simple Step-by-Step

Quick guide showing exactly where to put your API key, model, temperature, and other settings.

---

## 🔑 Step 1: Get Your API Key

1. Go to https://openrouter.ai/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-or-`)
4. Keep it safe!

---

## 📝 Step 2: Choose Your Configuration Method

### **Method A: Direct in index.html (Easiest)**

**File:** `index.html`

Find this section near the bottom (before `</body>`):

```html
<!-- CHAT POPUP SCRIPTS -->
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'YOUR_OPENROUTER_API_KEY'; // ← REPLACE THIS
        
        if (apiKey !== 'YOUR_OPENROUTER_API_KEY') {
            window.chatPopup = new ChatPopup(apiKey, {
                model: 'deepseek/deepseek-chat',  // ← CHANGE MODEL HERE
                useStreaming: true,
            });
        }
    });
</script>
```

**Replace `YOUR_OPENROUTER_API_KEY` with your actual key:**

```html
const apiKey = 'sk-or-abc123xyz789...'; // Your actual key
```

---

### **Method B: Using chat-config.js (Recommended)**

**File:** `chat-config.js` (copy from chat-config.example.js first)

1. Copy `chat-config.example.js`
2. Rename the copy to `chat-config.js`
3. Edit `chat-config.js` and find this line:

```javascript
apiKey: 'YOUR_OPENROUTER_API_KEY',
```

Replace with your actual key:

```javascript
apiKey: 'sk-or-abc123xyz789...',
```

Then also in the same file, you can customize:

```javascript
const CHAT_CONFIG = {
    apiKey: 'sk-or-abc123xyz789...',           // Your API key
    
    model: 'deepseek/deepseek-chat',           // Change model here
    useStreaming: true,
    maxTokens: 1000,                           // Max response length
    temperature: 0.7,                          // Creativity (0.0-1.0)
};
```

---

## 🤖 Step 3: Choose Your Model

Replace this line with one of the models below:

```javascript
model: 'deepseek/deepseek-chat',  // Current
```

### Available Models:

```javascript
// Fast & Cheap (Recommended)
model: 'deepseek/deepseek-chat'

// Other options:
model: 'openai/gpt-3.5-turbo'      // Fast, affordable
model: 'openai/gpt-4'              // Very smart, more expensive
model: 'anthropic/claude-3-sonnet' // Balanced
model: 'anthropic/claude-3-opus'   // Very smart
model: 'google/gemini-pro'         // Google's model
```

---

## 🌡️ Step 4: Set Temperature (Creativity)

Find this line:

```javascript
temperature: 0.7,
```

The value can be **0.0 to 1.0**:

```javascript
temperature: 0.0    // Always the same answer (factual)
temperature: 0.3    // More consistent responses
temperature: 0.7    // Balanced (recommended)
temperature: 1.0    // Very creative/random
```

### Examples:

**For customer service (stick to facts):**
```javascript
temperature: 0.3,
```

**For general chat (balanced):**
```javascript
temperature: 0.7,
```

**For creative responses:**
```javascript
temperature: 0.9,
```

---

## 📏 Step 5: Set Max Response Length

Find this line:

```javascript
maxTokens: 1000,
```

This controls how long responses can be:

```javascript
maxTokens: 500      // Shorter responses (fast, cheap)
maxTokens: 1000     // Medium responses (recommended)
maxTokens: 2000     // Longer responses (slower, more expensive)
```

---

## 💬 Step 6: Add Custom System Prompt (Optional)

If you want to customize how the AI behaves, edit the API file.

**File:** `js/openrouter-api.js`

Find this section (around line 50):

```javascript
async sendMessage(userMessage) {
    try {
        // Add user message to history
        this.addToHistory('user', userMessage);

        // Prepare request payload
        const payload = {
            model: this.model,
            messages: this.conversationHistory,
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            top_p: 0.95,
        };
```

To add a system prompt, modify it to:

```javascript
async sendMessage(userMessage) {
    try {
        // Add user message to history
        this.addToHistory('user', userMessage);

        // Build messages with system prompt
        const messages = [
            {
                role: 'system',
                content: 'You are a helpful assistant for A&O Contracting. Answer questions about our demolition and rubbish removal services. Be professional and concise.' // ← YOUR CUSTOM PROMPT
            },
            ...this.conversationHistory
        ];

        // Prepare request payload
        const payload = {
            model: this.model,
            messages: messages,  // ← Use messages with system prompt
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            top_p: 0.95,
        };
```

---

## ✅ Complete Example Configuration

Here's a complete example showing all settings together:

### In `chat-config.js`:

```javascript
const CHAT_CONFIG = {
    // Your OpenRouter API key
    apiKey: 'sk-or-your-actual-key-here-12345',
    
    // Model to use
    model: 'deepseek/deepseek-chat',
    
    // Enable real-time response streaming
    useStreaming: true,
    
    // Maximum response length in tokens
    maxTokens: 1000,
    
    // Response creativity (0-1)
    // 0.0 = factual, 1.0 = creative
    temperature: 0.7,
    
    // UI settings
    ui: {
        showModelSelector: true,
        position: 'bottom-right',
        welcomeTitle: 'AI Assistant',
        welcomeSubtitle: 'Powered by DeepSeek',
        welcomeMessage: "I'm here to help answer your questions about our services and contracts.",
    },
};
```

### Or in `index.html` (inline):

```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'sk-or-your-actual-key-here-12345';
        
        if (apiKey !== 'YOUR_OPENROUTER_API_KEY') {
            window.chatPopup = new ChatPopup(apiKey, {
                model: 'deepseek/deepseek-chat',
                useStreaming: true,
                maxTokens: 1000,
                temperature: 0.7,
            });
        }
    });
</script>
```

---

## 🚀 Quick Setup Checklist

- [ ] Get API key from OpenRouter
- [ ] Choose configuration method (A or B)
- [ ] Add API key to config
- [ ] Choose model from list
- [ ] Set temperature (0.3-0.9)
- [ ] Set maxTokens (500-2000)
- [ ] Save file
- [ ] Reload website
- [ ] Click chat button in bottom-right

---

## 🔄 Switching Models Later

To switch models, just change this line:

```javascript
// Current model
model: 'deepseek/deepseek-chat'

// To switch to GPT-4
model: 'openai/gpt-4'

// To switch to Claude
model: 'anthropic/claude-3-opus'
```

**Save file → Reload page → Done!**

No other code changes needed.

---

## 🆘 Troubleshooting

### Chat button doesn't appear?
- Check that you added your actual API key (not the placeholder)
- Open browser console (F12) and look for errors
- Check Network tab to see if files are loading

### Getting API errors?
- Verify API key is correct
- Check your OpenRouter account has credit
- Verify model name is spelled correctly
- Check internet connection

### Want to test without real API key first?
Just check the browser console to see the code is working.

---

## 📞 Support

For more details, see: `CHAT_POPUP_README.md`

For OpenRouter help: https://openrouter.ai/docs

---

That's it! You're ready to go. 🚀
