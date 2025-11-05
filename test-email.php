<?php
/**
 * Email Test Script - Check if Mailgun is working
 * Visit: https://aocontract.com.au/test-email.php
 */

header('Content-Type: text/html; charset=utf-8');

echo "<h1>A&O Contracting - Email Test</h1>";
echo "<hr>";

// Check PHP version
echo "<h2>1. PHP Version</h2>";
echo "<p><strong>PHP:</strong> " . phpversion() . "</p>";

// Check if curl is enabled
echo "<h2>2. cURL Extension</h2>";
if (function_exists('curl_version')) {
    $curl = curl_version();
    echo "<p>✅ <strong>cURL Enabled:</strong> Version " . $curl['version'] . "</p>";
} else {
    echo "<p>❌ <strong>cURL NOT enabled</strong></p>";
}

// Check environment variables
echo "<h2>3. Environment Variables</h2>";
$mailgunApiKey = getenv('MAILGUN_API_KEY');
$mailgunDomain = getenv('MAILGUN_DOMAIN');
$mailgunRegion = getenv('MAILGUN_REGION');
$recipientEmail = getenv('RECIPIENT_EMAIL');

if (!empty($mailgunApiKey)) {
    echo "<p>✅ <strong>MAILGUN_API_KEY:</strong> " . substr($mailgunApiKey, 0, 10) . "..." . substr($mailgunApiKey, -5) . "</p>";
} else {
    echo "<p>❌ <strong>MAILGUN_API_KEY:</strong> NOT SET</p>";
}

if (!empty($mailgunDomain)) {
    echo "<p>✅ <strong>MAILGUN_DOMAIN:</strong> " . htmlspecialchars($mailgunDomain) . "</p>";
} else {
    echo "<p>❌ <strong>MAILGUN_DOMAIN:</strong> NOT SET</p>";
}

if (!empty($mailgunRegion)) {
    echo "<p>✅ <strong>MAILGUN_REGION:</strong> " . htmlspecialchars($mailgunRegion) . "</p>";
} else {
    echo "<p>❌ <strong>MAILGUN_REGION:</strong> NOT SET (defaulting to 'api')</p>";
}

if (!empty($recipientEmail)) {
    echo "<p>✅ <strong>RECIPIENT_EMAIL:</strong> " . htmlspecialchars($recipientEmail) . "</p>";
} else {
    echo "<p>❌ <strong>RECIPIENT_EMAIL:</strong> NOT SET</p>";
}

// Test Mailgun API connection
echo "<h2>4. Mailgun API Test</h2>";

if (!empty($mailgunApiKey) && !empty($mailgunDomain)) {
    $mailgunUrl = "https://{$mailgunRegion}.mailgun.net/v3/{$mailgunDomain}/messages";
    
    $postData = [
        'from' => "Test <noreply@{$mailgunDomain}>",
        'to' => $recipientEmail,
        'subject' => 'Test Email from A&O Contracting Website',
        'text' => 'This is a test email to verify Mailgun integration is working correctly.',
        'html' => '<html><body><h1>Test Email</h1><p>This is a test email to verify Mailgun integration is working correctly.</p><p>Sent at: ' . date('Y-m-d H:i:s') . '</p></body></html>'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $mailgunUrl);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "api:{$mailgunApiKey}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    echo "<p><strong>API URL:</strong> " . htmlspecialchars($mailgunUrl) . "</p>";
    echo "<p><strong>HTTP Status:</strong> " . $httpCode . "</p>";
    
    if ($httpCode === 200) {
        echo "<p style='color: green; font-weight: bold;'>✅ SUCCESS! Test email sent to " . htmlspecialchars($recipientEmail) . "</p>";
        echo "<p><strong>Response:</strong></p>";
        echo "<pre>" . htmlspecialchars($response) . "</pre>";
        echo "<p><strong>Check your email at:</strong> " . htmlspecialchars($recipientEmail) . "</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ FAILED to send email</p>";
        echo "<p><strong>Response:</strong></p>";
        echo "<pre>" . htmlspecialchars($response) . "</pre>";
        if ($curlError) {
            echo "<p><strong>cURL Error:</strong> " . htmlspecialchars($curlError) . "</p>";
        }
    }
} else {
    echo "<p style='color: red;'>❌ Cannot test - Environment variables not configured</p>";
}

echo "<hr>";
echo "<p><em>Generated: " . date('Y-m-d H:i:s') . "</em></p>";
echo "<p><strong>⚠️ DELETE THIS FILE after testing for security!</strong></p>";
?>
