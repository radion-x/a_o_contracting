# Environment Setup Guide

Complete guide for configuring AI chat with environment variables for both development and production.

---

## Quick Start

### 1. Development Setup (Local)

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your values
nano .env
```

Add your configuration:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
OPENROUTER_MODEL=deepseek/deepseek-r1-0528-qwen3-8b:free
OPENROUTER_MAX_TOKENS=1000
OPENROUTER_TEMPERATURE=0.7
OPENROUTER_USE_STREAMING=true
```

### 2. Start Local Server

```bash
# Using PHP built-in server
php -S localhost:8000

# Or using Python
python -m http.server 8000
```

Visit `http://localhost:8000` and the chat will load with your .env configuration!

---

## Production Setup (Coolify)

### 1. Add Environment Variables in Coolify Dashboard

Navigate to your app in Coolify → Environment Variables → Add these:

| Variable | Example Value | Description |
|----------|--------------|-------------|
| `OPENROUTER_API_KEY` | `sk-or-v1-abc123...` | Your OpenRouter API key |
| `OPENROUTER_MODEL` | `deepseek/deepseek-r1-0528-qwen3-8b:free` | AI model to use |
| `OPENROUTER_MAX_TOKENS` | `1000` | Max response length |
| `OPENROUTER_TEMPERATURE` | `0.7` | Creativity level (0-1) |
| `OPENROUTER_USE_STREAMING` | `true` | Enable real-time responses |

### 2. Push to Git

```bash
git add .
git commit -m "Configure environment variables for chat"
git push
```

### 3. Coolify Auto-Deploys

Coolify will automatically:
- Pull your code
- Load environment variables
- Deploy the app
- Chat works immediately!

---

## How It Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│ DEVELOPMENT (.env file)                             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  .env file                                          │
│  ├─ OPENROUTER_API_KEY                             │
│  ├─ OPENROUTER_MODEL                               │
│  └─ ...                                             │
│         ↓                                            │
│  api/get-chat-config.php reads .env                │
│         ↓                                            │
│  Returns config to frontend                         │
│         ↓                                            │
│  Chat initializes with settings                     │
│                                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ PRODUCTION (Coolify Environment Variables)          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Coolify Dashboard                                  │
│  ├─ OPENROUTER_API_KEY                             │
│  ├─ OPENROUTER_MODEL                               │
│  └─ ...                                             │
│         ↓                                            │
│  api/get-chat-config.php reads environment          │
│         ↓                                            │
│  Returns config to frontend                         │
│         ↓                                            │
│  Chat initializes with settings                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Security: Backend Proxy

**API Key Never Exposed to Client!**

```
Frontend (JavaScript)
    ↓ Sends user message
Backend (api/chat.php)
    ↓ Adds API key (from environment)
    ↓ Forwards to OpenRouter
OpenRouter API
    ↓ Returns AI response
Backend (api/chat.php)
    ↓ Forwards response
Frontend (JavaScript)
    ↓ Displays to user
```

---

## File Structure

```
project/
├── .env                          # Your secrets (NOT in git)
├── .env.example                  # Template (in git)
├── .gitignore                    # Excludes .env from git
├── api/
│   ├── get-chat-config.php      # Returns chat configuration
│   └── chat.php                  # Proxies API requests
├── js/
│   ├── openrouter-api.js        # API client (updated for proxy)
│   └── chat-popup.js            # Chat UI
└── index.html                    # Main page (loads config from API)
```

---

## Configuration Options

### All Available Settings

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `OPENROUTER_API_KEY` | String | Required | Your OpenRouter API key |
| `OPENROUTER_MODEL` | String | `deepseek/deepseek-chat` | AI model identifier |
| `OPENROUTER_MAX_TOKENS` | Integer | `1000` | Maximum response length |
| `OPENROUTER_TEMPERATURE` | Float | `0.7` | Creativity (0=factual, 1=creative) |
| `OPENROUTER_USE_STREAMING` | Boolean | `true` | Enable real-time streaming |

### Available Models

| Model ID | Name | Speed | Cost | Best For |
|----------|------|-------|------|----------|
| `deepseek/deepseek-r1-0528-qwen3-8b:free` | DeepSeek R1 | Fast | FREE | Development/Testing |
| `deepseek/deepseek-chat` | DeepSeek Chat | Fast | Very Cheap | General purpose |
| `openai/gpt-3.5-turbo` | GPT-3.5 | Fast | Cheap | Fast responses |
| `openai/gpt-4` | GPT-4 | Slow | Expensive | Complex tasks |
| `anthropic/claude-3-sonnet` | Claude 3 | Medium | Medium | Balanced |

---

## Changing Configuration

### Development (Local)

1. Edit `.env` file
2. Change values
3. Refresh browser
4. Done!

### Production (Coolify)

1. Open Coolify dashboard
2. Navigate to your app → Environment Variables
3. Edit the variable
4. Click "Restart" (or wait for auto-restart)
5. Done!

---

## Troubleshooting

### Chat doesn't load

**Check browser console (F12):**

```javascript
// If you see this:
⚠️ Chat initialization failed: Failed to load chat configuration

// Solution:
1. Make sure .env file exists (dev) OR environment variables are set (production)
2. Check that OPENROUTER_API_KEY is set
3. Verify PHP is running (dev)
```

### API key not found

```bash
# Development
cat .env | grep OPENROUTER_API_KEY
# Should show your key

# Production
# Check Coolify dashboard → Environment Variables
```

### Wrong model being used

```bash
# Check what's configured
curl http://localhost:8000/api/get-chat-config.php

# Should return:
{
  "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "useStreaming": true,
  "maxTokens": 1000,
  "temperature": 0.7
}
```

### Chat sends but no response

1. Check browser console for errors
2. Check that model ID is correct
3. Verify API key has credit (OpenRouter dashboard)
4. Test backend directly: `curl -X POST http://localhost:8000/api/chat.php -d '{"messages":[{"role":"user","content":"hi"}]}'`

---

## Security Best Practices

### ✅ DO:
- Keep `.env` out of git (already in `.gitignore`)
- Use Coolify environment variables in production
- Rotate API keys regularly
- Monitor usage in OpenRouter dashboard

### ❌ DON'T:
- Commit `.env` to git
- Share API keys in chat/email
- Use production API keys in development
- Expose API keys in client-side code

---

## Git Setup

### What's Committed:
- ✅ `.env.example` (template)
- ✅ `.gitignore` (excludes .env)
- ✅ All code files
- ✅ Documentation

### What's NOT Committed:
- ❌ `.env` (your secrets)
- ❌ `.DS_Store` (OS files)
- ❌ `*.log` (logs)

---

## Team Collaboration

### For New Developers:

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd ao_contract_2

# 2. Copy environment template
cp .env.example .env

# 3. Get API key
# Visit https://openrouter.ai/keys
# Create new key

# 4. Edit .env with your key
nano .env

# 5. Start server
php -S localhost:8000

# 6. Done! Visit http://localhost:8000
```

---

## Coolify Deployment Checklist

- [ ] Code pushed to git repository
- [ ] Coolify connected to repository
- [ ] Environment variables added in Coolify dashboard:
  - [ ] `OPENROUTER_API_KEY`
  - [ ] `OPENROUTER_MODEL`
  - [ ] `OPENROUTER_MAX_TOKENS`
  - [ ] `OPENROUTER_TEMPERATURE`
  - [ ] `OPENROUTER_USE_STREAMING`
- [ ] App deployed successfully
- [ ] Tested chat on production URL
- [ ] Verified correct model is being used

---

## Support

- **OpenRouter Docs:** https://openrouter.ai/docs
- **Get API Key:** https://openrouter.ai/keys
- **Check Usage:** https://openrouter.ai/activity
- **Model Pricing:** https://openrouter.ai/models

---

## Summary

**Development:**
```bash
.env → api/get-chat-config.php → Frontend
```

**Production:**
```bash
Coolify Env Vars → api/get-chat-config.php → Frontend
```

**Same code works for both!** 🎉
