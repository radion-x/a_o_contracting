<?php
/**
 * A & O Contracting - Form Handler
 * Handles contact form and quote form submissions via Mailgun API
 */

// Enable error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 in production
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php-errors.log');

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get Mailgun credentials from environment variables
// These will be set in Coolify dashboard
$mailgunApiKey = getenv('MAILGUN_API_KEY') ?: '';
$mailgunDomain = getenv('MAILGUN_DOMAIN') ?: '';
$mailgunRegion = getenv('MAILGUN_REGION') ?: 'api'; // 'api' for US, 'api.eu' for EU

// Recipient email (your business email)
$toEmail = getenv('RECIPIENT_EMAIL') ?: 'info@aocontract.com.au';

// Validate environment variables
if (empty($mailgunApiKey) || empty($mailgunDomain)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Server configuration error. Please contact support.'
    ]);
    error_log('Mailgun credentials not configured');
    exit();
}

// Log that we received a request
error_log('=== Email form submission received ===');
error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);

// Get and validate POST data
$rawInput = file_get_contents('php://input');
error_log('Raw input: ' . $rawInput);

$data = json_decode($rawInput, true);

if (!$data) {
    // Try form-encoded data
    error_log('JSON decode failed, trying $_POST');
    $data = $_POST;
    error_log('POST data: ' . print_r($_POST, true));
}

error_log('Parsed data: ' . print_r($data, true));

// Basic validation
if (empty($data['name']) || empty($data['email'])) {
    error_log('Validation failed: name or email missing');
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and email are required']);
    exit();
}

// Sanitize inputs
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? filter_var($data['phone'], FILTER_SANITIZE_STRING) : '';
$message = isset($data['message']) ? filter_var($data['message'], FILTER_SANITIZE_STRING) : '';
$formType = isset($data['formType']) ? filter_var($data['formType'], FILTER_SANITIZE_STRING) : 'contact';
$suburb = isset($data['suburb']) ? filter_var($data['suburb'], FILTER_SANITIZE_STRING) : '';
$service = isset($data['service']) ? filter_var($data['service'], FILTER_SANITIZE_STRING) : '';

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Build email subject and body based on form type
if ($formType === 'quote') {
    $subject = 'New Quote Request from ' . $name;
    
    $service = isset($data['service']) ? $data['service'] : 'Not specified';
    $suburb = isset($data['suburb']) ? $data['suburb'] : 'Not specified';
    $propertyType = isset($data['propertyType']) ? $data['propertyType'] : 'Not specified';
    $projectSize = isset($data['projectSize']) ? $data['projectSize'] : 'Not specified';
    $timeline = isset($data['timeline']) ? $data['timeline'] : 'Not specified';
    $asbestos = isset($data['asbestos']) ? $data['asbestos'] : 'Unknown';
    
    $emailBody = "New Quote Request\n\n";
    $emailBody .= "Contact Information:\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n\n";
    $emailBody .= "Project Details:\n";
    $emailBody .= "Service Required: $service\n";
    $emailBody .= "Suburb: $suburb\n";
    $emailBody .= "Property Type: $propertyType\n";
    $emailBody .= "Project Size: $projectSize\n";
    $emailBody .= "Timeline: $timeline\n";
    $emailBody .= "Asbestos Present: $asbestos\n\n";
    $emailBody .= "Additional Details:\n$message\n\n";
    
    $htmlBody = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;'>
            <div style='background-color: #003366; padding: 20px; text-align: center;'>
                <h1 style='color: #FF6600; margin: 0;'>New Quote Request</h1>
            </div>
            <div style='background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px;'>
                <h2 style='color: #003366; border-bottom: 2px solid #FF6600; padding-bottom: 10px;'>Contact Information</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>Phone:</strong> <a href='tel:$phone'>$phone</a></p>
                
                <h2 style='color: #003366; border-bottom: 2px solid #FF6600; padding-bottom: 10px; margin-top: 30px;'>Project Details</h2>
                <p><strong>Service Required:</strong> $service</p>
                <p><strong>Suburb:</strong> $suburb</p>
                <p><strong>Property Type:</strong> $propertyType</p>
                <p><strong>Project Size:</strong> $projectSize</p>
                <p><strong>Timeline:</strong> $timeline</p>
                <p><strong>Asbestos Present:</strong> $asbestos</p>
                
                <h2 style='color: #003366; border-bottom: 2px solid #FF6600; padding-bottom: 10px; margin-top: 30px;'>Additional Details</h2>
                <p style='background-color: #f8f9fa; padding: 15px; border-radius: 5px;'>$message</p>
            </div>
            <div style='text-align: center; margin-top: 20px; color: #666; font-size: 12px;'>
                <p>This email was sent from the A & O Contracting website quote form</p>
            </div>
        </div>
    </body>
    </html>
    ";
} else {
    // Contact form
    $subject = 'New Contact Form Submission from ' . $name;

    $emailBody = "New Contact Form Submission\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    if ($suburb) {
        $emailBody .= "Suburb: $suburb\n";
    }
    if ($service) {
        $emailBody .= "Service Required: $service\n";
    }
    $emailBody .= "\nMessage:\n$message\n";

    $htmlBody = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;'>
            <div style='background-color: #003366; padding: 20px; text-align: center;'>
                <h1 style='color: #FF6600; margin: 0;'>New Contact Form Submission</h1>
            </div>
            <div style='background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px;'>
                <h2 style='color: #003366; border-bottom: 2px solid #FF6600; padding-bottom: 10px;'>Contact Information</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>Phone:</strong> <a href='tel:$phone'>$phone</a></p>";

    if ($suburb) {
        $htmlBody .= "<p><strong>Suburb:</strong> $suburb</p>";
    }
    if ($service) {
        $htmlBody .= "<p><strong>Service Required:</strong> $service</p>";
    }

    $htmlBody .= "
                <h2 style='color: #003366; border-bottom: 2px solid #FF6600; padding-bottom: 10px; margin-top: 30px;'>Message</h2>
                <p style='background-color: #f8f9fa; padding: 15px; border-radius: 5px;'>$message</p>
            </div>
            <div style='text-align: center; margin-top: 20px; color: #666; font-size: 12px;'>
                <p>This email was sent from the A & O Contracting website contact form</p>
            </div>
        </div>
    </body>
    </html>
    ";
}

// Prepare Mailgun API request
$mailgunUrl = "https://{$mailgunRegion}.mailgun.net/v3/{$mailgunDomain}/messages";

$postData = [
    'from' => "A&O Contracting Website <noreply@{$mailgunDomain}>",
    'to' => $toEmail,
    'subject' => $subject,
    'text' => $emailBody,
    'html' => $htmlBody,
    'h:Reply-To' => $email
];

// Send via Mailgun API using cURL
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

// Check if request was successful
if ($httpCode === 200) {
    // Decode Mailgun response
    $mailgunResponse = json_decode($response, true);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
        'debug' => [
            'recipient' => $toEmail,
            'mailgun_id' => $mailgunResponse['id'] ?? 'N/A'
        ]
    ]);

    // Log detailed success information
    error_log("Email sent successfully to $toEmail from $email");
    error_log("Mailgun Message ID: " . ($mailgunResponse['id'] ?? 'N/A'));
    error_log("Full Mailgun Response: " . $response);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or call us directly.'
    ]);
    
    // Log error
    error_log("Mailgun API error: HTTP $httpCode - Response: $response - cURL Error: $curlError");
}
