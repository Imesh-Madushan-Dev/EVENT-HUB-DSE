<?php
// Start the session to store user data after login
session_start();

// Include the database connection file
include 'connection.php';

// Check if the request method is POST (form submission)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get email and password from the submitted form
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Create a simple SQL query to check if the email exists
    $sql = "SELECT * FROM users WHERE email = '$email'";
    
    // Run the query
    $result = mysqli_query($conn, $sql);
    
    // Check if any user exists with that email
    if (mysqli_num_rows($result) > 0) {
        // Fetch user data
        $user = mysqli_fetch_assoc($result);
        
        // Check if the entered password matches the stored password
        if ($password == $user['password']) {
            // Store user details in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            
            // Send success response with a redirect link
            echo json_encode([
                'success' => true,
                'redirect' => 'pages/dashboard.html'
            ]);
        } else {
            // Wrong password message
            echo json_encode([
                'success' => false,
                'message' => 'Invalid password'
            ]);
        }
    } else {
        // Email not found message
        echo json_encode([
            'success' => false,
            'message' => 'Email not found'
        ]);
    }
} else {
    // If the request is not POST, return an error
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

// Close the database connection
mysqli_close($conn);
?>
