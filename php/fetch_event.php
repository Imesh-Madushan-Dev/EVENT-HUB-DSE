<?php
// Include the database connection file
include 'connection.php';

// Query to get all events sorted by date in ascending order
$query = "SELECT * FROM events ORDER BY date ASC";

// Execute the query
$result = mysqli_query($conn, $query);

// Create an array to store event data
$events = array();

// Check if there are any events in the database
if (mysqli_num_rows($result) > 0) {
    // Fetch each event and store it in the array
    while ($row = mysqli_fetch_assoc($result)) {
        $events[] = $row;
    }
}

// Convert the events array to JSON format and display it
echo json_encode($events);

// Close the database connection
mysqli_close($conn);
?>
