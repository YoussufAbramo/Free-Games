<?php
/**
 * User Data Collection API
 * Handles saving user email subscriptions securely
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit();
}

// Path to user data file (outside web root for security)
$dataFile = __DIR__ . '/../user_data.json';

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!$data || !isset($data['name']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit();
}

$name = trim($data['name']);
$email = trim($data['email']);

// Validate name
if (empty($name) || strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a valid name']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Initialize data file if it doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
}

// Read existing data
$fileContents = file_get_contents($dataFile);
$userData = json_decode($fileContents, true);

// Handle JSON decode errors
if ($userData === null) {
    $userData = [];
}

// Check if email already exists
foreach ($userData as $user) {
    if (isset($user['email']) && strtolower($user['email']) === strtolower($email)) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered']);
        exit();
    }
}

// Add new user data
$newUser = [
    'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    'timestamp' => isset($data['timestamp']) ? $data['timestamp'] : date('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
];

$userData[] = $newUser;

// Save to file with proper permissions
if (file_put_contents($dataFile, json_encode($userData, JSON_PRETTY_PRINT))) {
    // Set file permissions to read/write for owner only
    chmod($dataFile, 0600);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'User data saved successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save user data']);
}
