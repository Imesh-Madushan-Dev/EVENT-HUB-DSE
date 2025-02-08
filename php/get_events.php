<?php
session_start();
header('Content-Type: application/json');

require_once 'connection.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

try {
    // Enable error reporting for debugging
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
    // Fetch all events ordered by date (newest first)
    $sql = "SELECT * FROM events ORDER BY date DESC, time DESC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $events = array();
    while ($row = $result->fetch_assoc()) {
        // Format the data for JSON response
        $event = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'date' => $row['date'],
            'time' => $row['time'],
            'location' => $row['location'],
            'category' => $row['category'],
            'image_url' => $row['image_url']
        );
        $events[] = $event;
    }
    
    echo json_encode($events);
    
} catch (Exception $e) {
    error_log("Database error in get_events.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error occurred',
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>
