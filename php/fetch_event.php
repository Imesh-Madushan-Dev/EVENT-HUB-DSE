<?php
require_once 'connection.php';
global $conn;

$query = "SELECT * FROM events ORDER BY date ASC";
$result = $conn->query($query);

$events = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

echo json_encode($events);
$conn->close();
?>