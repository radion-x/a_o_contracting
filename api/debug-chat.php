<?php
/**
 * Debug endpoint to test OpenRouter API
 * This will help us see what's actually being sent/received
 */

header('Content-Type: text/plain');

// Load environment variables
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value, '\'" ');
        }
    }
}

// Get configuration
$apiKey = $_ENV['OPENROUTER_API_KEY'] ?? getenv('OPENROUTER_API_KEY');
$model = $_ENV['OPENROUTER_MODEL'] ?? getenv('OPENROUTER_MODEL') ?? 'deepseek/deepseek-chat';

echo "=== DEBUG INFO ===\n\n";
echo "API Key Found: " . ($apiKey ? "YES (starts with: " . substr($apiKey, 0, 20) . "...)" : "NO") . "\n";
echo "Model: $model\n\n";

// Test simple API call
$testPayload = [
    'model' => $model,
    'messages' => [
        ['role' => 'user', 'content' => 'Say "test successful"']
    ],
    'max_tokens' => 50,
    'stream' => false
];

echo "=== REQUEST ===\n";
echo json_encode($testPayload, JSON_PRETTY_PRINT) . "\n\n";

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($testPayload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
        'HTTP-Referer: ' . ($_SERVER['HTTP_HOST'] ?? 'aocontract.com.au'),
        'X-Title: AO Contract Chat',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

echo "=== RESPONSE ===\n";
echo "HTTP Code: $httpCode\n";
if ($curlError) {
    echo "cURL Error: $curlError\n";
}
echo "Response:\n";
echo $response . "\n";

curl_close($ch);
?>
