# Coolify Configuration Issue - IMPORTANT

## The Problem
Coolify is detecting your deployment as "Static" and using `nginx:alpine` instead of building your custom `Dockerfile` with PHP support.

From the logs:
```
Static deployment. Copying static assets to the image.
Pulling latest image (nginx:alpine) from the registry.
```

## Solution: Change Deployment Type in Coolify

### Step 1: Access Application Settings
1. Open your Coolify dashboard
2. Go to your **A & O Contracting** application
3. Click on **"General"** or **"Configuration"** tab

### Step 2: Find Build/Deploy Settings
Look for one of these options:
- **"Build Pack"**
- **"Deployment Type"**  
- **"Source Type"**
- **"Build Method"**

### Step 3: Change to Docker
Current setting: **"Static"** or **"Nginx"** ❌
Change to: **"Dockerfile"** or **"Docker"** ✅

### Step 4: Verify Dockerfile Path
Make sure it points to: `./Dockerfile` (root of repo)

### Step 5: Save & Redeploy
- Click **"Save"**
- Click **"Redeploy"** or **"Force Deploy"**

## What You Should See After Fix

The build logs should show:
```
Building with Dockerfile...
[1/X] FROM docker.io/library/php:8.2-apache
Installing PHP extensions...
✅ Apache + PHP 8.2 configured
```

NOT:
```
Static deployment...
Pulling nginx:alpine  ← This is wrong!
```

## Alternative: Check docker-compose.yaml

If Coolify is using a docker-compose.yaml file, check if it exists in your repo. If it does, it might be overriding the Dockerfile.

**To check:**
```bash
ls -la docker-compose.yaml
```

If it exists and you don't need it, delete it:
```bash
rm docker-compose.yaml
git add -A
git commit -m "Remove docker-compose.yaml to use Dockerfile"
git push
```

## Environment Variables (Already Set ✅)
Your environment variables are being loaded correctly:
```
MAILGUN_API_KEY=key-xxxxxxxxxxxxx (✅ Detected in logs)
MAILGUN_DOMAIN=mg.websited.org
MAILGUN_REGION=api
RECIPIENT_EMAIL=info@aocontracting.com.au
```

These will work once PHP is enabled!

## Need Help?

If you can't find the "Build Pack" setting in Coolify:
1. Take a screenshot of your application settings page
2. Look for documentation on Coolify about Dockerfile deployments
3. Check if there's a `.coolify` or `coolify.yaml` config file in your repo

The key is: **Coolify must use your Dockerfile, not treat it as static files!**
