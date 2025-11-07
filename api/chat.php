<?php
/**
 * OpenRouter API Proxy
 * Securely proxies chat requests to OpenRouter without exposing API key to client
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Load environment variables from .env file (development only)
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
$maxTokens = intval($_ENV['OPENROUTER_MAX_TOKENS'] ?? getenv('OPENROUTER_MAX_TOKENS') ?? 1000);
$temperature = floatval($_ENV['OPENROUTER_TEMPERATURE'] ?? getenv('OPENROUTER_TEMPERATURE') ?? 0.7);
$systemPrompt = $_ENV['OPENROUTER_SYSTEM_PROMPT'] ?? getenv('OPENROUTER_SYSTEM_PROMPT') ?? 'You are a helpful AI assistant.';

// Validate API key
if (!$apiKey || $apiKey === 'your_api_key_here') {
    http_response_code(503);
    echo json_encode(['error' => 'Chat service not configured']);
    exit();
}

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request: messages required']);
    exit();
}

// Add system prompt as first message if not already present
$messages = $input['messages'];
if (count($messages) === 0 || $messages[0]['role'] !== 'system') {
    array_unshift($messages, [
        'role' => 'system',
        'content' => $systemPrompt
    ]);
}

// Prepare OpenRouter API request
$payload = [
    'model' => $model,
    'messages' => $messages,
    'max_tokens' => $maxTokens,
    'temperature' => $temperature,
    'top_p' => 0.95,
    'stream' => isset($input['stream']) ? $input['stream'] : false,
];

// Make request to OpenRouter
$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
        'HTTP-Referer: ' . ($_SERVER['HTTP_REFERER'] ?? $_SERVER['HTTP_HOST']),
        'X-Title: AO Contract Chat',
    ],
]);

// Handle streaming
if ($payload['stream']) {
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    header('X-Accel-Buffering: no');

    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($curl, $data) {
        echo $data;
        flush();
        return strlen($data);
    });

    curl_exec($ch);
} else {
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        http_response_code(500);
        echo json_encode(['error' => 'API request failed: ' . curl_error($ch)]);
    } else {
        http_response_code($httpCode);
        echo $response;
    }
}

curl_close($ch);
?>
