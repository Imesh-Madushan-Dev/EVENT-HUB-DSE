<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in by verifying session variables
if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
    echo json_encode(['loggedIn' => true, 'id' => $_SESSION['user_id']]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
