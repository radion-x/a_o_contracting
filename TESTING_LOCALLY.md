# 🧪 Testing Locally - Quick Start

Yes! For **local testing**, put credentials directly in `index.html`. This is fine for development.

---

## Quick Local Testing (5 minutes)

### Step 1: Get API Key
- Go to https://openrouter.ai/keys
- Create/copy your API key (starts with `sk-or-`)

### Step 2: Update index.html

Find this section near the bottom of `index.html`:

```html
<!-- CHAT POPUP SCRIPTS -->
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'YOUR_OPENROUTER_API_KEY'; // ← REPLACE THIS
        
        if (apiKey !== 'YOUR_OPENROUTER_API_KEY') {
            window.chatPopup = new ChatPopup(apiKey, {
                model: 'deepseek/deepseek-chat',
                useStreaming: true,
            });
        } else {
            console.warn('Chat popup: API key not configured.');
        }
    });
</script>
```

Replace `YOUR_OPENROUTER_API_KEY` with your actual key:

```html
const apiKey = 'sk-or-abc123def456...'; // Your real key
```

### Step 3: Save & Test

1. Save the file
2. Open `index.html` in your browser (or run local server)
3. Look for chat button in bottom-right corner
4. Click it and test!

---

## 🔧 Exact Example

**Before (not working):**
```html
const apiKey = 'YOUR_OPENROUTER_API_KEY';
```

**After (working):**
```html
const apiKey = 'sk-or-x7z8y9u8i7o6p5q4r3s2t1u0v9w8x7';
```

---

## ✅ Local Testing Checklist

- [ ] OpenRouter API key obtained
- [ ] API key pasted into index.html
- [ ] File saved
- [ ] Browser opened to your website
- [ ] Chat button visible (bottom-right corner)
- [ ] Clicked chat button
- [ ] Welcome message appears
- [ ] Typed a message
- [ ] Got a response ✨

---

## 🚀 After Testing Works

When you're ready to deploy to **Coolify**:

1. **REMOVE** API key from index.html
2. Update index.html to use the Coolify version (see `COOLIFY_SETUP.md`)
3. Add `OPENROUTER_API_KEY` to Coolify environment variables
4. Deploy

---

## ⚠️ Important Notes

### For Local Testing
✅ **OK:** Put API key in index.html
✅ **OK:** Share with teammates on local network
✅ **OK:** Test different models

### For Production (Coolify)
❌ **NOT OK:** API key in index.html
✅ **REQUIRED:** Use Coolify environment variables
✅ **REQUIRED:** Update index.html to use `/api/get-chat-config.php`

---

## 🧪 Testing Commands

### If using Python
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

### If using Node
```bash
npx http-server
# Then visit http://localhost:8080
```

### If using PHP
```bash
php -S localhost:8000
# Then visit http://localhost:8000
```

---

## 🔄 How to Change Models While Testing

Want to test with a different model?

Just change this line in index.html:

```javascript
model: 'deepseek/deepseek-chat',    // Change to any model
```

Examples:
```javascript
model: 'openai/gpt-4',
model: 'openai/gpt-3.5-turbo',
model: 'anthropic/claude-3-opus',
model: 'google/gemini-pro',
```

Save → Refresh page → Test!

---

## 💡 Tips for Testing

**Test different models:**
- DeepSeek: Fast, cheap (default)
- GPT-3.5: Fast, affordable
- GPT-4: Smarter, more expensive
- Claude: Excellent reasoning
- Gemini: Google's model

**Test different temperatures:**
```javascript
temperature: 0.3,   // Factual
temperature: 0.7,   // Balanced (default)
temperature: 0.9,   // Creative
```

**Test different response lengths:**
```javascript
maxTokens: 500,     // Short
maxTokens: 1000,    // Medium (default)
maxTokens: 2000,    // Long
```

---

## ✨ That's It!

1. Put API key in index.html
2. Save
3. Open in browser
4. Click chat button
5. Test!

When ready for production → See `COOLIFY_SETUP.md`

Enjoy! 🚀
