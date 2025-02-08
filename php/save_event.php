<?php
session_start();
require_once 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Get form data
$title = $_POST['title'];
$description = $_POST['description'];
$date = $_POST['date'];
$time = $_POST['time'];
$location = $_POST['location'];
$category = $_POST['category'];
$image_url = $_POST['image_url'];

$sql = "INSERT INTO events (user_id, title, description, date, time, location, category, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssssss", $user_id, $title, $description, $date, $time, $location, $category, $image_url);
    // i - integer
    // s - string
    // s - string
    // s - string
    // s - string
    // s - string
    // s - string
    // s - string
    
$stmt->execute();
    
$stmt->close();
$conn->close();
?>
