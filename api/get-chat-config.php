<?php
/**
 * Secure Chat Configuration Endpoint
 * 
 * This file provides the chat configuration to the frontend WITHOUT exposing
 * the API key in client-side code. The API key is kept secure on the server.
 * 
 * Usage: Frontend calls /api/get-chat-config.php to get safe configuration
 */

// ========================================
// SECURITY HEADERS
// ========================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ========================================
// CONFIGURATION
// ========================================

// IMPORTANT: Store your OpenRouter API key as an environment variable
// For local development, you can use a .env file
// For production, use your hosting provider's environment variables

// Load all environment variables from .env file (development only)
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments and empty lines
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;

        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, '\'" '); // Remove quotes and spaces
            $_ENV[$key] = $value;
        }
    }
}

// Get configuration values (from .env or Coolify environment variables)
$apiKey = $_ENV['OPENROUTER_API_KEY'] ?? getenv('OPENROUTER_API_KEY');
$model = $_ENV['OPENROUTER_MODEL'] ?? getenv('OPENROUTER_MODEL') ?? 'deepseek/deepseek-chat';
$maxTokens = intval($_ENV['OPENROUTER_MAX_TOKENS'] ?? getenv('OPENROUTER_MAX_TOKENS') ?? 1000);
$temperature = floatval($_ENV['OPENROUTER_TEMPERATURE'] ?? getenv('OPENROUTER_TEMPERATURE') ?? 0.7);
$useStreaming = filter_var(
    $_ENV['OPENROUTER_USE_STREAMING'] ?? getenv('OPENROUTER_USE_STREAMING') ?? 'true',
    FILTER_VALIDATE_BOOLEAN
);
$systemPrompt = $_ENV['OPENROUTER_SYSTEM_PROMPT'] ?? getenv('OPENROUTER_SYSTEM_PROMPT') ?? 'You are a helpful AI assistant.';

// ========================================
// VALIDATION
// ========================================

// Check if API key is configured
if (!$apiKey || $apiKey === 'YOUR_OPENROUTER_API_KEY') {
    http_response_code(503);
    echo json_encode([
        'error' => 'Chat service not configured',
        'message' => 'API key not found. Please configure OPENROUTER_API_KEY environment variable.'
    ]);
    exit();
}

// ========================================
// RATE LIMITING (Optional but recommended)
// ========================================

$clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimit = new SimpleRateLimit('/tmp/chat_rate_limit_', 100, 3600); // 100 requests per hour

if (!$rateLimit->isAllowed($clientIp)) {
    http_response_code(429);
    echo json_encode([
        'error' => 'Rate limit exceeded',
        'message' => 'Too many requests. Please try again later.'
    ]);
    exit();
}

// ========================================
// RESPONSE
// ========================================

// Return safe configuration (API key never exposed to client)
$config = [
    // API key is NOT included here - it stays on the server
    'model' => $model,
    'useStreaming' => $useStreaming,
    'maxTokens' => $maxTokens,
    'temperature' => $temperature,
    'systemPrompt' => $systemPrompt,
];

http_response_code(200);
echo json_encode($config);
exit();

// ========================================
// HELPER CLASS: Simple Rate Limiting
// ========================================

class SimpleRateLimit {
    private $cacheDir;
    private $limit;
    private $window;

    public function __construct($cacheDir, $limit, $window) {
        $this->cacheDir = $cacheDir;
        $this->limit = $limit;
        $this->window = $window;
    }

    public function isAllowed($identifier) {
        $filename = $this->cacheDir . md5($identifier) . '.txt';
        $now = time();

        // Create cache directory if needed
        if (!is_dir(dirname($this->cacheDir))) {
            @mkdir(dirname($this->cacheDir), 0755, true);
        }

        // Read existing count
        $count = 0;
        $timestamp = 0;

        if (file_exists($filename)) {
            $data = file_get_contents($filename);
            list($timestamp, $count) = explode(':', $data);
        }

        // Reset if window expired
        if ($now - $timestamp > $this->window) {
            $count = 0;
            $timestamp = $now;
        }

        // Increment counter
        $count++;

        // Write back
        file_put_contents($filename, "$timestamp:$count", LOCK_EX);

        return $count <= $this->limit;
    }
}

?>
