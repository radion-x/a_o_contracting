# 🔄 What To Replace - Before & After

After testing locally, replace the API key with this secure code for Coolify deployment.

---

## 📍 Find This In index.html

Near the bottom of your file, before `</body>`:

```html
<!-- CHAT POPUP SCRIPTS -->
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'sk-or-x7z8y9u8i7o6p5q4r3s2t1u0v9w8x7'; // ← THIS PART
        
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

---

## ❌ REMOVE This (Your Testing Code)

```html
<!-- CHAT POPUP SCRIPTS -->
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'sk-or-x7z8y9u8i7o6p5q4r3s2t1u0v9w8x7'; // DELETE THIS LINE
        
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

---

## ✅ REPLACE With This (For Coolify)

```html
<!-- CHAT POPUP SCRIPTS -->
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Fetch config from backend (API key stays secure on server)
        fetch('/api/get-chat-config.php')
            .then(res => res.json())
            .then(config => {
                window.chatPopup = new ChatPopup('', {
                    model: config.model,
                    useStreaming: config.useStreaming,
                    maxTokens: config.maxTokens,
                    temperature: config.temperature,
                });
            })
            .catch(err => {
                console.warn('Chat not available:', err);
            });
    });
</script>
```

---

## 🔄 Side-By-Side Comparison

### Testing (Local)
```javascript
const apiKey = 'sk-or-your-actual-key-here';
window.chatPopup = new ChatPopup(apiKey, {
    model: 'deepseek/deepseek-chat',
    useStreaming: true,
});
```

### Production (Coolify)
```javascript
fetch('/api/get-chat-config.php')
    .then(res => res.json())
    .then(config => {
        window.chatPopup = new ChatPopup('', {
            model: config.model,
            useStreaming: config.useStreaming,
            maxTokens: config.maxTokens,
            temperature: config.temperature,
        });
    });
```

---

## 📋 Step-By-Step Replacement

### Step 1: Open index.html

### Step 2: Find the entire script block (shown above in red)

### Step 3: Select all the code between `<script>` and `</script>`

### Step 4: Delete it

### Step 5: Paste the new code (shown above in green)

### Step 6: Save the file

### Step 7: Commit to git & push to Coolify

---

## ✨ What's Happening

**Before (Testing):**
- API key visible in code ❌
- Works locally ✅
- Not safe for production ❌

**After (Production):**
- No API key in code ✅
- Backend calls `/api/get-chat-config.php` ✅
- API key comes from Coolify environment ✅
- Secure! ✅

---

## 🎯 That's The Only Change

Just replace that one JavaScript block. Everything else stays the same:

- ✅ CSS files - no changes
- ✅ JS files - no changes
- ✅ HTML structure - no changes
- ✅ Only the initialization script changes

---

## 📝 Your Coolify Setup Checklist

- [ ] Tested locally with API key in index.html ✅
- [ ] Chat is working ✅
- [ ] Ready to deploy
- [ ] Open index.html
- [ ] Replace the script block (above)
- [ ] Save file
- [ ] Add `OPENROUTER_API_KEY` to Coolify environment
- [ ] Commit & push to git
- [ ] Coolify auto-deploys
- [ ] Test on live site
- [ ] Done! 🚀

---

## ⚠️ Important

**Don't forget:**
1. Remove/replace the API key from index.html ✅
2. Add `OPENROUTER_API_KEY` to Coolify dashboard ✅
3. File `/api/get-chat-config.php` must exist on server ✅

---

## 🆘 Troubleshooting

### Chat doesn't work after replacing code?

**Check:**
1. Is `/api/get-chat-config.php` on the server?
2. Is `OPENROUTER_API_KEY` added to Coolify?
3. Did Coolify deploy after adding the environment variable?
4. Check browser console (F12) for errors

### Still showing error?

**Solution:**
1. Hardcode the API key back temporarily
2. Test if chat works
3. If yes, then backend issue
4. If no, then JavaScript issue

---

That's it! Just swap the code block and you're ready for production! 🎉
