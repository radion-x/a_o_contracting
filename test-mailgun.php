<?php
/**
 * Mailgun Configuration Test Script
 * This script tests your Mailgun setup and sends a test email
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Mailgun Configuration Test</h1>";
echo "<pre>";

// Check environment variables
echo "=== ENVIRONMENT VARIABLES ===\n";
$mailgunApiKey = getenv('MAILGUN_API_KEY');
$mailgunDomain = getenv('MAILGUN_DOMAIN');
$mailgunRegion = getenv('MAILGUN_REGION') ?: 'api';
$recipientEmail = getenv('RECIPIENT_EMAIL') ?: 'info@aocontract.com.au';

echo "MAILGUN_API_KEY: " . ($mailgunApiKey ? "SET (length: " . strlen($mailgunApiKey) . ")" : "NOT SET") . "\n";
echo "MAILGUN_DOMAIN: " . ($mailgunDomain ? $mailgunDomain : "NOT SET") . "\n";
echo "MAILGUN_REGION: " . $mailgunRegion . "\n";
echo "RECIPIENT_EMAIL: " . $recipientEmail . "\n\n";

// Check if required variables are set
if (empty($mailgunApiKey) || empty($mailgunDomain)) {
    echo "ERROR: MAILGUN_API_KEY and MAILGUN_DOMAIN must be set!\n";
    echo "\nIn Coolify, go to your app settings and add these environment variables:\n";
    echo "- MAILGUN_API_KEY=your-api-key\n";
    echo "- MAILGUN_DOMAIN=your-domain.com\n";
    echo "- MAILGUN_REGION=api (or api.eu for Europe)\n";
    echo "- RECIPIENT_EMAIL=info@aocontract.com.au\n";
    exit;
}

echo "=== SENDING TEST EMAIL ===\n";

// Prepare test email
$mailgunUrl = "https://{$mailgunRegion}.mailgun.net/v3/{$mailgunDomain}/messages";
echo "Mailgun URL: $mailgunUrl\n\n";

$postData = [
    'from' => "Test <noreply@{$mailgunDomain}>",
    'to' => $recipientEmail,
    'subject' => 'Test Email from A&O Contracting Website',
    'text' => "This is a test email sent at " . date('Y-m-d H:i:s') . "\n\nIf you receive this, your Mailgun configuration is working correctly!",
    'html' => "<h1>Test Email</h1><p>This is a test email sent at " . date('Y-m-d H:i:s') . "</p><p>If you receive this, your Mailgun configuration is working correctly!</p>"
];

// Send via Mailgun API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $mailgunUrl);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "api:{$mailgunApiKey}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

echo "Sending request...\n";
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo "\n=== RESPONSE ===\n";
echo "HTTP Code: $httpCode\n";
if ($curlError) {
    echo "cURL Error: $curlError\n";
}
echo "Response Body:\n";
echo $response . "\n\n";

// Decode response
$responseData = json_decode($response, true);

if ($httpCode === 200) {
    echo "✅ SUCCESS! Email sent successfully!\n";
    echo "Message ID: " . ($responseData['id'] ?? 'N/A') . "\n";
    echo "\nCheck your inbox at: $recipientEmail\n";
    echo "Also check your spam/junk folder if you don't see it.\n";
} else {
    echo "❌ FAILED! Email not sent.\n\n";
    echo "Common issues:\n";
    echo "1. Invalid API key\n";
    echo "2. Domain not verified in Mailgun\n";
    echo "3. Using sandbox domain without authorized recipients\n";
    echo "4. Wrong region (try changing MAILGUN_REGION from 'api' to 'api.eu' or vice versa)\n";
    echo "5. Recipient email not authorized (if using sandbox domain)\n\n";

    if (isset($responseData['message'])) {
        echo "Error message: " . $responseData['message'] . "\n";
    }
}

echo "</pre>";
?>
