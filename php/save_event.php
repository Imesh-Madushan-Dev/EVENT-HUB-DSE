<?php
// Start session to check if the user is logged in
session_start();

// Include database connection
include 'connection.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

// Get the logged-in user ID
$user_id = $_SESSION['user_id'];

// Get form data
$title = $_POST['title'];
$description = $_POST['description'];
$date = $_POST['date'];
$time = $_POST['time'];
$location = $_POST['location'];
$category = $_POST['category'];
$image_url = $_POST['image_url'];

// SQL query to insert the event data into the database
$query = "INSERT INTO events (user_id, title, description, date, time, location, category, image_url) 
          VALUES ('$user_id', '$title', '$description', '$date', '$time', '$location', '$category', '$image_url')";
    
// Execute the query
if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true, 'message' => 'Event created successfully']);
} else {
    echo json_encode(['success' => false, 'error' => 'Event creation failed']);
}

// Close the database connection
mysqli_close($conn);
?>
