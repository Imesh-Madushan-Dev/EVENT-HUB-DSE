<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventhub";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to handle special characters properly
$conn->set_charset("utf8mb4");



// $servername = "sql206.iceiy.com";
// $username = "icei_38270458";
// $password = "";
// $dbname = "icei_38270458_eventhub";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);

// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// // Set charset to handle special characters properly
// $conn->set_charset("utf8mb4");



?>

