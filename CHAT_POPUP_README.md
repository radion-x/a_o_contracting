# AI Chat Popup - OpenRouter Integration

## Overview

A professional, modern AI chat popup system for your A & O Contracting website. The chat integrates with OpenRouter API, allowing seamless communication with multiple AI models including DeepSeek, GPT-4, Claude, and more.

### Key Features

✨ **Modern & Responsive Design**
- Beautiful gradient styling matching your brand colors
- Smooth animations and transitions
- Fully responsive for mobile and desktop
- Professional message bubbles with timestamps

🤖 **Model Flexibility**
- Switch between different AI models with a single line change
- DeepSeek (default), GPT-4, Claude 3, Gemini Pro, and more
- Model selector dropdown in the chat UI
- Streaming responses for real-time interaction

⚡ **Optimized Performance**
- Lightweight JavaScript implementation
- No external dependencies required (vanilla JS)
- CSS-based animations (hardware accelerated)
- Efficient state management

🔒 **Production Ready**
- Error handling with user-friendly messages
- Typing indicators for better UX
- Message history management
- Conversation context preservation

---

## Quick Start

### 1. Get Your OpenRouter API Key

1. Visit https://openrouter.ai/keys
2. Sign up for a free account
3. Create an API key
4. Copy your key

### 2. Configure the Chat Popup

**Option A: Direct Configuration (Simple)**

Add this to your `index.html` before the closing `</body>` tag:

```html
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'sk-or-YOUR_API_KEY_HERE'; // Replace with your key
        window.chatPopup = new ChatPopup(apiKey, {
            model: 'deepseek/deepseek-chat',
            useStreaming: true,
        });
    });
</script>
```

**Option B: Using Configuration File (Recommended)**

1. Copy `chat-config.example.js` and rename to `chat-config.js`
2. Add your API key to the file
3. Add this to your HTML:

```html
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script src="chat-config.js"></script>
```

---

## Switching Models

The beauty of this system is that **you can change models without modifying any code**. Just update the model name:

### Available Models

| Model | ID | Speed | Cost | Best For |
|-------|----|----|------|----------|
| DeepSeek Chat | `deepseek/deepseek-chat` | ⚡⚡⚡ Fast | $ Cheap | Default, fast responses |
| GPT-4 | `openai/gpt-4` | ⚡ Slower | $$$ Expensive | Complex tasks |
| GPT-3.5 Turbo | `openai/gpt-3.5-turbo` | ⚡⚡⚡ Fast | $ Cheap | General purpose |
| Claude 3 Opus | `anthropic/claude-3-opus` | ⚡ Slower | $$ Medium | Advanced reasoning |
| Claude 3 Sonnet | `anthropic/claude-3-sonnet` | ⚡⚡ Medium | $$ Medium | Balanced |
| Gemini Pro | `google/gemini-pro` | ⚡⚡ Medium | $ Cheap | Multimodal tasks |
| Llama 2 70B | `meta-llama/llama-2-70b-chat` | ⚡⚡ Medium | $ Cheap | Open source |

### How to Switch Models

**In chat-config.js:**
```javascript
model: 'openai/gpt-4'  // Change this line
```

**Or programmatically:**
```javascript
// After creating the chatPopup instance
window.chatPopup.api.setModel('anthropic/claude-3-opus');
```

**From the UI:**
- Users can select a different model from the dropdown in the chat header

---

## Configuration Options

### Basic Configuration

```javascript
const config = {
    model: 'deepseek/deepseek-chat',     // AI model to use
    maxTokens: 1000,                      // Max response length
    temperature: 0.7,                     // Creativity (0-1)
    useStreaming: true,                   // Real-time responses
};

window.chatPopup = new ChatPopup(apiKey, config);
```

### All Configuration Options

```javascript
{
    model: 'deepseek/deepseek-chat',
    maxMessages: 50,           // Max messages to keep
    useStreaming: true,        // Enable streaming
    maxTokens: 1000,           // Max response tokens
    temperature: 0.7,          // Response randomness (0-1)
}
```

---

## File Structure

```
project/
├── css/
│   ├── chat-popup.css          # Chat styling
│   ├── style.css
│   ├── variables.css
│   └── responsive.css
├── js/
│   ├── openrouter-api.js       # API client
│   ├── chat-popup.js           # Chat UI manager
│   ├── main.js
│   └── ...
├── chat-config.example.js      # Configuration template
├── index.html                  # Main page (updated)
└── CHAT_POPUP_README.md        # This file
```

---

## Usage

### Basic Usage

The chat popup automatically initializes when the API key is configured. Users will see a floating button in the bottom-right corner.

### API Methods

```javascript
// Get the chat instance
const chat = window.chatPopup;

// Open/close the chat
chat.open();
chat.close();
chat.toggle();

// Clear chat history
chat.clearHistory();

// Get conversation history
const history = chat.getHistory();

// Change model programmatically
chat.changeModel('openai/gpt-4');

// Send a message programmatically
// (Useful for quick actions or pre-filled responses)
```

### Quick Action Buttons

The welcome message includes quick action buttons:

```javascript
// Users can click these buttons to auto-populate messages:
- "Our Services"
- "Request Quote"
- "Contact Us"
```

---

## Customization

### Styling

All styling uses CSS variables for easy customization. Edit `css/variables.css`:

```css
:root {
    --primary-color: #003366;      /* Deep Navy Blue */
    --secondary-color: #FF6600;    /* Bold Orange */
    --accent-color: #FFA500;       /* Bright Orange */
    /* ... other variables ... */
}
```

### Chat Appearance

Modify these classes in `css/chat-popup.css`:

- `.chat-toggle-btn` - The floating button
- `.chat-container` - The main chat window
- `.chat-header` - Header section
- `.message-bubble` - Message styling
- `.chat-input` - Input field

### Welcome Message

Edit the `showWelcomeMessage()` method in `js/chat-popup.js` to customize the welcome screen.

---

## Security Best Practices

### Never expose your API key in client-side code for production

**❌ Insecure (do not do this):**
```javascript
// Hardcoding API key in JavaScript
const apiKey = 'sk-or-xxxxx';
```

**✅ Secure approach:**
```javascript
// Load from backend API
fetch('/api/chat-config')
    .then(res => res.json())
    .then(config => {
        window.chatPopup = new ChatPopup(config.apiKey, {
            model: config.model,
        });
    });
```

### For Production

1. Store your API key in environment variables
2. Create a backend endpoint that provides the API key securely
3. Add rate limiting to prevent abuse
4. Monitor API usage in your OpenRouter dashboard

---

## Troubleshooting

### Chat popup doesn't appear

**Checks:**
- ✅ Is the API key configured? Check console for warnings
- ✅ Is JavaScript enabled?
- ✅ Are the CSS and JS files being loaded? Check Network tab
- ✅ Are there any console errors? Open Developer Tools (F12)

### Getting API errors

**Common issues:**
- ❌ Invalid API key format
- ❌ API key not found or revoked
- ❌ Account has no credit
- ❌ Model name is misspelled
- ❌ API rate limits exceeded

**Fix:**
```javascript
// Check API key validity
console.log('API Key:', apiKey.substring(0, 10) + '...');
```

### Model not working

**Solution:**
1. Verify the model name from the table above
2. Check that your OpenRouter account supports the model
3. Try switching to 'deepseek/deepseek-chat' as a fallback
4. Check your account credit

### Slow responses

**Optimization:**
- Use a faster model like `openai/gpt-3.5-turbo`
- Reduce `maxTokens` to limit response length
- Enable `useStreaming: true` for real-time feedback

---

## Performance Tips

### Optimize for Your Use Case

**For Speed:**
```javascript
model: 'openai/gpt-3.5-turbo',
maxTokens: 500,
temperature: 0.5,
```

**For Quality:**
```javascript
model: 'openai/gpt-4',
maxTokens: 2000,
temperature: 0.7,
```

**For Cost:**
```javascript
model: 'deepseek/deepseek-chat',
maxTokens: 1000,
temperature: 0.7,
```

### Monitor Usage

Track your API usage in your OpenRouter dashboard:
- https://openrouter.ai/activity

---

## Examples

### Example 1: Switch to GPT-4

```javascript
// In chat-config.js or inline
window.chatPopup.api.setModel('openai/gpt-4');
```

### Example 2: Pre-populate a message

```javascript
// Simulate user clicking a quick action
const input = document.querySelector('.chat-input');
input.value = 'Tell me about your residential demolition services';
document.querySelector('.chat-send-btn').click();
```

### Example 3: Handle specific responses

```javascript
// Listen for messages (extend ChatPopup class)
class CustomChatPopup extends ChatPopup {
    addMessage(content, sender) {
        if (sender === 'assistant') {
            // Do something with AI response
            console.log('AI said:', content);
        }
        super.addMessage(content, sender);
    }
}
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ❌ Not supported |

---

## FAQ

**Q: Can I use this without OpenRouter?**
A: You could modify the code to use a different API, but OpenRouter is recommended for its model variety and pricing.

**Q: Is there a cost?**
A: OpenRouter charges per API call based on the model. Pricing varies by model (DeepSeek is very affordable).

**Q: Can users see the chat history?**
A: Yes, the history is stored in memory during the session. It's cleared when the browser is refreshed.

**Q: How do I save chat history?**
A: You can extend the ChatPopup class or use localStorage/backend API to persist messages.

**Q: Can I customize the UI?**
A: Yes! All styling is in `css/chat-popup.css` and uses CSS variables for easy theming.

**Q: What if I want to change the model name shown to users?**
A: Edit the model list in `js/openrouter-api.js` in the `getAvailableModels()` method.

---

## Support & Resources

- **OpenRouter Docs:** https://openrouter.ai/docs
- **API Keys:** https://openrouter.ai/keys
- **Models Available:** https://openrouter.ai
- **Status Page:** https://status.openrouter.io

---

## Version

- **Current Version:** 1.0.0
- **Last Updated:** 2025-07-11
- **Author:** A & O Contracting

---

## License

This chat system is provided as-is for use on the A & O Contracting website.

**Important:** Keep your OpenRouter API key confidential. Never commit `chat-config.js` with your real API key to version control.
