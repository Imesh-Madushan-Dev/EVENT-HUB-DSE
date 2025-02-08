<?php
// Include database connection
require_once 'connection.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password']; // Password is now stored as plain text

    // Basic input validation
    if (empty($name) || empty($email) || empty($password)) {
        echo "All fields are required";
        exit();
    }

    // Simple email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
    }

    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $password]); // Using plain text password

        echo "Registration successful!";
        // Redirect to login page after 2 seconds
        header("refresh:2;url=../login.html");
    } catch(PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "Email already exists";
        } else {
            echo "Registration failed: " . $e->getMessage();
        }
    }
}
?>
