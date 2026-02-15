<?php
// get_notifications.php
include 'db.php';

if (isset($_GET['user_id'])) {
    $user_id = $conn->real_escape_string($_GET['user_id']);

    $sql = "SELECT * FROM notifications WHERE user_id = '$user_id' ORDER BY sent_at DESC LIMIT 20";
    $result = $conn->query($sql);

    $notifications = [];
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }

    echo json_encode($notifications);
} else {
    echo json_encode(["status" => "error", "message" => "User ID missing"]);
}
$conn->close();
?>
