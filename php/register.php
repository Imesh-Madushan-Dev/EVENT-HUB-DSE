<?php
// Include database connection
include 'connection.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password']; // Password stored as plain text (not recommended for real projects)

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

    // Insert data into the users table
    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    
    // Execute the query
    if (mysqli_query($conn, $query)) {
        echo "Registration successful!";
        // Redirect to login page after 2 seconds
        header("refresh:2;url=../login.html");
    } else {
        // Check if email already exists
        if (mysqli_errno($conn) == 1062) {
            echo "Email already exists";
        } else {
            echo "Registration failed: " . mysqli_error($conn);
        }
    }
}

// Close the database connection
mysqli_close($conn);
?>