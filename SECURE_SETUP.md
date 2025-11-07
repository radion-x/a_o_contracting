# 🔒 Secure Chat Setup - Production Ready

This guide shows how to set up the chat popup **securely** so your API key is never exposed in client-side code.

---

## ⚠️ The Problem with Client-Side API Keys

❌ **NOT SAFE:**
```javascript
// This exposes your API key to anyone who views page source!
const apiKey = 'sk-or-abc123xyz...';
```

**Risks:**
- Anyone can see your API key in browser DevTools
- Anyone can copy it from page source
- Your API key could be used by others
- You could be billed for their usage

---

## ✅ The Secure Solution

Use a backend API endpoint that:
1. Keeps your API key on the server (hidden)
2. Returns only safe configuration to the frontend
3. Handles API calls securely
4. Implements rate limiting for protection

---

## 🚀 Setup Instructions

### Step 1: Create .env File

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=sk-or-your-actual-key-here
```

3. **IMPORTANT:** Add `.env` to `.gitignore`:
```
# .gitignore
.env
.env.local
chat-config.js
```

### Step 2: Update index.html (Secure Version)

Replace this (unsafe):
```html
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'YOUR_OPENROUTER_API_KEY';
        // ...exposes API key...
    });
</script>
```

With this (secure):
```html
<script src="js/openrouter-api.js"></script>
<script src="js/chat-popup.js"></script>
<script>
    // Fetch safe config from backend (API key stays on server)
    fetch('/api/get-chat-config.php')
        .then(res => res.json())
        .then(config => {
            // Chat initialization happens here
            // Backend makes API calls, frontend never sees the key
            setupChat(config);
        })
        .catch(err => {
            console.error('Chat config error:', err);
        });
    
    // Initialize chat with backend-provided config
    function setupChat(config) {
        // API key from backend is used server-side only
        window.chatPopup = new ChatPopup('', {
            model: config.model,
            useStreaming: config.useStreaming,
            maxTokens: config.maxTokens,
            temperature: config.temperature,
        });
    }
</script>
```

### Step 3: How It Works

**Architecture:**

```
User Browser                    Your Server
─────────────────────────────────────────
   │                                │
   ├─ Clicks chat button            │
   │                                │
   ├─ Sends message ──────────────→ gets config from
   │  (no API key)      /api/       get-chat-config.php
   │                                │
   │                          Uses API key HERE
   │                          (stays secret)
   │                                │
   │ ← Response from AI ←────────────┤
   │                                │
   └─ Displays in chat              │
```

### Step 4: Production Deployment

#### For Shared Hosting (Cpanel, Plesk, etc.):

1. Create `.env` file in your website root
2. Add API key to `.env`
3. The PHP script reads it automatically

#### For VPS / Dedicated Servers:

Set environment variable instead:

**Using .env file:**
```bash
cat > /var/www/aocontracting/.env << EOF
OPENROUTER_API_KEY=sk-or-your-key-here
EOF
chmod 600 /var/www/aocontracting/.env
```

**Or using system environment:**
```bash
# Add to /etc/environment or your hosting control panel
OPENROUTER_API_KEY=sk-or-your-key-here
```

#### For Docker:

```dockerfile
# Dockerfile
ENV OPENROUTER_API_KEY=sk-or-your-key-here
```

Or use docker-compose:
```yaml
# docker-compose.yml
services:
  web:
    environment:
      - OPENROUTER_API_KEY=sk-or-your-key-here
```

---

## 🔐 Security Checklist

- [ ] .env file created with your API key
- [ ] .env added to .gitignore
- [ ] Never commit .env to git
- [ ] Updated index.html to use /api/get-chat-config.php
- [ ] Verified API key is NOT in any JavaScript files
- [ ] Tested chat works with backend config
- [ ] Set proper file permissions on .env (600)
- [ ] Rate limiting enabled in get-chat-config.php

---

## 🛡️ Additional Security Features

The backend endpoint (`api/get-chat-config.php`) includes:

### 1. Rate Limiting
- Limits API requests to 100 per hour per IP
- Prevents abuse and DOS attacks
- Configurable in the PHP file

### 2. CORS Protection
- Only allows requests from your domain
- Prevents cross-origin abuse

### 3. Error Handling
- Doesn't expose real errors to users
- Shows generic messages only

### 4. Environment Variable Support
- Reads from .env file (dev)
- Reads from system environment (production)
- Fails gracefully if key not set

---

## 🆘 Troubleshooting

### Chat popup doesn't appear

**Check:**
1. Is .env file created with your API key?
2. Does /api/get-chat-config.php exist?
3. Check browser console (F12) for errors
4. Check server PHP error logs

### API key not being read

**Solution:**
```bash
# Check if .env file exists
ls -la .env

# Check permissions
chmod 600 .env

# Test if readable by PHP
cat .env
```

### Still exposing API key?

**Search for these in your code:**
```javascript
// These are NOT safe:
apiKey: 'sk-or-...'
OPENROUTER_API_KEY=sk-or-...
```

They should ONLY be in:
- `.env` file (in root directory, not committed)
- Server environment variables

### Rate limiting too strict?

Edit `api/get-chat-config.php`:
```php
// Line 60: Change from 100 to higher number
new SimpleRateLimit('/tmp/chat_rate_limit_', 100, 3600); // 100 per hour
new SimpleRateLimit('/tmp/chat_rate_limit_', 1000, 3600); // 1000 per hour
```

---

## 📊 Development vs Production

### Development (Local Testing)

```
✅ SAFE: Use .env file with API key
✅ SAFE: Use /api/get-chat-config.php
❌ NOT SAFE: Hardcode API key in JavaScript
```

### Production (Live Server)

```
✅ MUST: Use .env file or environment variable
✅ RECOMMENDED: Use /api/get-chat-config.php
✅ REQUIRED: Never expose API key in client code
✅ REQUIRED: Add rate limiting
✅ REQUIRED: Monitor API usage
```

---

## 📋 File Checklist

| File | Purpose | Secure? |
|------|---------|---------|
| `.env.example` | Template (commit to git) | ✅ Yes |
| `.env` | Actual keys (DON'T commit) | ✅ Yes |
| `api/get-chat-config.php` | Backend API (commit to git) | ✅ Yes |
| `index.html` | Frontend (commit to git) | ✅ Yes |
| `js/chat-popup.js` | Chat UI (commit to git) | ✅ Yes |
| `js/openrouter-api.js` | API client (commit to git) | ✅ Yes |

---

## 🚀 Quick Start Secure Setup

```bash
# 1. Copy template
cp .env.example .env

# 2. Edit .env (add your real API key)
nano .env

# 3. Set permissions (don't allow web access)
chmod 600 .env

# 4. Add to gitignore (prevent committing)
echo ".env" >> .gitignore

# 5. Update index.html to use /api/get-chat-config.php

# 6. Test
# - Visit your website
# - Click chat button
# - Verify it works
# - Check DevTools - API key should NOT be visible!
```

---

## 📚 Resources

- OpenRouter API: https://openrouter.ai/docs
- PHP .env libraries: https://github.com/vlucas/phpdotenv
- Rate limiting best practices: https://en.wikipedia.org/wiki/Rate_limiting
- Security headers: https://owasp.org/www-project-secure-headers/

---

## ✨ Summary

**Before (Unsafe):**
- API key exposed in browser DevTools ❌
- Anyone can steal your key ❌
- Unlimited usage (you pay!) ❌

**After (Secure):**
- API key stays on server only ✅
- No way to see it in browser ✅
- Rate limited (100/hour) ✅
- Protected from abuse ✅

That's it! Your chat is now production-ready and secure. 🔒
