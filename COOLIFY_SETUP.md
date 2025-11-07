# 🚀 Chat Popup Setup for Coolify Deployment

**Good news:** Yes, this setup works perfectly with Coolify! You can add the OpenRouter API key in the Coolify dashboard just like you do with Mailgun credentials.

---

## ✅ How It Works with Coolify

Your existing setup with Coolify environment variables is **exactly what we need**:

```
Coolify Dashboard
    ↓
Set `OPENROUTER_API_KEY` environment variable
    ↓
PHP script reads it automatically
    ↓
API key stays secure on server
    ↓
Chat works perfectly!
```

---

## 🔧 Step-by-Step: Coolify Setup

### Step 1: In Coolify Dashboard

1. Go to your Coolify project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:

**Variable Name:** `OPENROUTER_API_KEY`  
**Variable Value:** `sk-or-your-actual-key-from-openrouter`

Just like you do with Mailgun!

```
MAILGUN_API_KEY=key-xxxx...
MAILGUN_DOMAIN=mail.aocontracting...
OPENROUTER_API_KEY=sk-or-xxxx...  ← ADD THIS
```

### Step 2: Deploy Your Files

Upload these files to your Coolify project:

```
css/
├── chat-popup.css          (new)
js/
├── openrouter-api.js       (new)
├── chat-popup.js           (new)
api/
├── get-chat-config.php     (new)
index.html                  (updated)
.env.example                (optional template)
chat-config.example.js      (optional template)
```

**Important:** Do NOT upload:
- `.env` file (use Coolify dashboard instead)
- `chat-config.js` (use Coolify dashboard instead)

### Step 3: Update index.html

Replace this:
```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'YOUR_OPENROUTER_API_KEY';
        window.chatPopup = new ChatPopup(apiKey, {
            model: 'deepseek/deepseek-chat',
            useStreaming: true,
        });
    });
</script>
```

With this:
```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Coolify: Fetch config from backend
        // API key from Coolify environment variables (secure!)
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

### Step 4: Deploy & Test

1. In Coolify, redeploy your application
2. Wait for deployment to finish
3. Visit your website
4. Click the chat button
5. Test the chat

---

## 🌍 Coolify Environment Variables Explained

**Coolify automatically provides environment variables to your application:**

```php
<?php
// In your PHP files
$mailgunKey = getenv('MAILGUN_API_KEY');      // You already use this!
$openrouterKey = getenv('OPENROUTER_API_KEY'); // Same concept!
?>
```

This is exactly what `api/get-chat-config.php` does:

```php
$apiKey = getenv('OPENROUTER_API_KEY');  // Reads from Coolify dashboard
```

---

## 📝 Coolify Dashboard Screenshot

In your Coolify project:

```
Project Settings
  └─ Environment Variables
     ├─ MAILGUN_API_KEY = key-abc123...
     ├─ MAILGUN_DOMAIN = mail.aocontracting.com.au
     ├─ DB_HOST = postgres.railway.internal
     ├─ DB_PASSWORD = xxx...
     └─ OPENROUTER_API_KEY = sk-or-xxx...  ← ADD THIS
```

---

## ✅ Complete Coolify Checklist

- [ ] Create OpenRouter account & get API key
- [ ] In Coolify dashboard → Environment Variables
- [ ] Add `OPENROUTER_API_KEY` with your key
- [ ] Upload new chat files to repository
- [ ] Update `index.html` to use `/api/get-chat-config.php`
- [ ] Commit & push to your git repo
- [ ] Coolify automatically redeploys
- [ ] Test chat works
- [ ] No API key in client-side code ✅

---

## 🔄 Changing Configuration Later

Want to change the model, temperature, or other settings?

**In Coolify:**
1. Go to Environment Variables
2. Add new variables (optional):
   ```
   CHAT_MODEL=openai/gpt-4
   CHAT_TEMPERATURE=0.5
   CHAT_MAX_TOKENS=2000
   ```

**In `api/get-chat-config.php`:**
Update lines to read from environment:
```php
$config = [
    'model' => getenv('CHAT_MODEL') ?: 'deepseek/deepseek-chat',
    'temperature' => (float)getenv('CHAT_TEMPERATURE') ?: 0.7,
    'maxTokens' => (int)getenv('CHAT_MAX_TOKENS') ?: 1000,
    'useStreaming' => true,
];
```

Then redeploy.

---

## 🆘 Troubleshooting for Coolify

### Chat button doesn't appear

**Check:**
1. Was `OPENROUTER_API_KEY` added to Coolify environment?
2. Did you redeploy after adding the variable?
3. Browser console (F12): Any errors?

### Still showing old code?

**Solution:**
1. In Coolify, trigger a new deployment
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)

### Getting 503 error from `/api/get-chat-config.php`

**This means:** Environment variable not found

**Fix:**
1. Check Coolify dashboard - is `OPENROUTER_API_KEY` set?
2. Wait for deployment to complete
3. Check the value is correct (`sk-or-...`)

### Rate limit errors?

**This is good!** Rate limiting is working.

**Fix:**
1. Edit `api/get-chat-config.php`
2. Change line 60 to higher limit:
```php
new SimpleRateLimit('/tmp/chat_rate_limit_', 1000, 3600); // Higher limit
```
3. Redeploy

---

## 📂 File Structure for Coolify

```
your-repository/
├── api/
│   └── get-chat-config.php    ← NEW
├── css/
│   ├── chat-popup.css         ← NEW
│   └── ... (existing files)
├── js/
│   ├── openrouter-api.js      ← NEW
│   ├── chat-popup.js          ← NEW
│   └── ... (existing files)
├── index.html                 ← UPDATED
├── .env.example               ← NEW (reference only)
├── chat-config.example.js     ← NEW (reference only)
└── ... (other files)
```

**Note:** `.env` and `chat-config.js` should NOT be in repository

---

## 🎯 Summary for Coolify Users

Your exact workflow:

1. **Get API Key**
   - Go to https://openrouter.ai/keys
   - Create key

2. **Add to Coolify** (same place as Mailgun)
   - Coolify Dashboard → Environment Variables
   - `OPENROUTER_API_KEY=sk-or-xxx`

3. **Upload Files**
   - Push new chat files to your git repo
   - Update `index.html`
   - Coolify auto-deploys

4. **Test**
   - Visit website
   - Click chat button
   - Chat works!

No `.env` files needed for Coolify - you use the dashboard like you already do with Mailgun. Perfect!

---

## 💡 Why This Works So Well

✅ **Coolify Environment Variables:**
- Same system you use for Mailgun
- Secure (not in code)
- Easy to change anytime
- Auto-deploys when updated

✅ **Our PHP Backend:**
- Reads environment variables automatically
- Never exposes API key to frontend
- Works seamlessly with Coolify

✅ **No Extra Work:**
- No `.env` file to manage
- No special configuration
- Just add variable like you do with Mailgun

---

## 🚀 You're Ready!

Since you already use Coolify with Mailgun, this setup will be familiar to you. Just add the `OPENROUTER_API_KEY` environment variable in the same place you added `MAILGUN_API_KEY`, deploy the new files, and you're done!

Questions? Check the other setup guides:
- `SETUP_CHAT.md` - For development
- `SECURE_SETUP.md` - For other hosting types
- `CHAT_POPUP_README.md` - Full documentation
