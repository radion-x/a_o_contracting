# Email Configuration Guide for Coolify

## Overview
This guide shows you how to configure Mailgun email integration for the A & O Contracting website forms securely using Coolify environment variables.

## Prerequisites
- Mailgun account (free tier works fine)
- Mailgun domain verified
- Mailgun API key

---

## Step 1: Get Your Mailgun Credentials

### 1.1 Login to Mailgun
Go to https://app.mailgun.com/

### 1.2 Get Your API Key
1. Click on your name (top right)
2. Go to **"API Keys"**
3. Copy your **Private API key** (starts with `key-`)

### 1.3 Get Your Domain
1. Go to **"Sending"** → **"Domains"**
2. Copy your domain (e.g., `mg.yourdomain.com` or `sandboxXXXX.mailgun.org`)

### 1.4 Check Your Region
- If you're using **US servers**: Region is `api`
- If you're using **EU servers**: Region is `api.eu`

---

## Step 2: Configure Coolify Environment Variables

### 2.1 In Coolify Dashboard:
1. Go to your **A & O Contracting** project
2. Click on **"Environment Variables"** or **"Secrets"**
3. Add the following variables:

```bash
MAILGUN_API_KEY=key-your-actual-api-key-here
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_REGION=api
RECIPIENT_EMAIL=info@aocontracting.com.au
```

### 2.2 Important Notes:
- **MAILGUN_API_KEY**: Your private API key from Mailgun (NOT the public key)
- **MAILGUN_DOMAIN**: Your sending domain from Mailgun
- **MAILGUN_REGION**: Use `api` for US region, `api.eu` for EU region
- **RECIPIENT_EMAIL**: The email address where form submissions will be sent

---

## Step 3: Verify PHP Support in Coolify

Make sure your Coolify deployment supports PHP:

### Option A: Static PHP Deployment
If Coolify auto-detects PHP files, it should work automatically.

### Option B: Add Dockerfile (if needed)
Create a `Dockerfile` in your project root:

```dockerfile
FROM php:8.2-apache

# Enable PHP extensions
RUN docker-php-ext-install curl

# Copy website files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Enable Apache rewrite module
RUN a2enmod rewrite

EXPOSE 80
```

### Option C: Add .htaccess (for Apache)
Create `.htaccess` in your root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
</IfModule>

# Ensure PHP files are processed
AddType application/x-httpd-php .php
```

---

## Step 4: Deploy and Test

### 4.1 Commit and Push
```bash
git add send-email.php js/form-validation.js SETUP_GUIDE.md
git commit -m "Add Mailgun email integration for forms"
git push
```

### 4.2 Redeploy in Coolify
1. Go to your Coolify dashboard
2. Click **"Redeploy"** or **"Force Deploy"**
3. Wait for deployment to complete

### 4.3 Test the Forms
1. Visit your live website
2. Fill out the **Contact Form** or **Quote Form**
3. Submit and watch for success message
4. Check your email at `info@aocontracting.com.au`

---

## Step 5: Troubleshooting

### Email Not Sending?

#### Check 1: PHP Errors
SSH into your Coolify container and check logs:
```bash
tail -f /tmp/php-errors.log
```

#### Check 2: Verify Environment Variables
In PHP, you can temporarily check if variables are set:
```php
<?php
echo getenv('MAILGUN_API_KEY') ? 'API Key Set' : 'API Key Missing';
?>
```

#### Check 3: Test Mailgun Directly
Use curl to test Mailgun:
```bash
curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN/messages \
    -F from='Test <test@YOUR_DOMAIN>' \
    -F to='info@aocontracting.com.au' \
    -F subject='Test Email' \
    -F text='Testing Mailgun'
```

#### Check 4: Browser Console
Open browser developer tools (F12) and check:
- **Network tab**: Look for `send-email.php` request
- **Console tab**: Look for JavaScript errors

#### Check 5: CORS Issues
If you see CORS errors, make sure `send-email.php` has these headers:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
```

---

## Security Best Practices

✅ **NEVER commit API keys to git**
✅ **Always use environment variables** in Coolify
✅ **Disable PHP error display** in production:
   ```php
   ini_set('display_errors', 0);
   ```
✅ **Enable error logging** to file only
✅ **Validate and sanitize** all inputs (already done in PHP script)
✅ **Use HTTPS** for your website (Coolify handles this)

---

## Alternative: Using Mailgun SMTP (Optional)

If you prefer SMTP instead of API, you can modify the PHP to use PHPMailer:

### Install PHPMailer (via Composer):
```bash
composer require phpmailer/phpmailer
```

### Update send-email.php:
```php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.mailgun.org';
$mail->SMTPAuth = true;
$mail->Username = getenv('MAILGUN_SMTP_USERNAME');
$mail->Password = getenv('MAILGUN_SMTP_PASSWORD');
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('noreply@yourdomain.com', 'A&O Contracting');
$mail->addAddress(getenv('RECIPIENT_EMAIL'));
$mail->Subject = $subject;
$mail->Body = $htmlBody;
$mail->AltBody = $emailBody;

$mail->send();
```

---

## Support

If you encounter issues:
1. Check Coolify logs
2. Check PHP error logs
3. Verify Mailgun dashboard for sending activity
4. Test with Mailgun's sandbox domain first
5. Contact Mailgun support if API issues persist

---

## Summary

✅ Created `send-email.php` - Secure backend handler
✅ Updated `form-validation.js` - Frontend integration
✅ Environment variables - Stored in Coolify (secure)
✅ API approach - No exposed credentials
✅ HTML emails - Professional branded templates
✅ Error handling - User-friendly messages

Your forms are now ready to send emails securely! 🎉
