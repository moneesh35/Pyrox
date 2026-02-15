<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->sleep_time)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

$user_id = $conn->real_escape_string($data->user_id);
$sleep_time = $conn->real_escape_string($data->sleep_time);

$sql = "UPDATE users SET sleep_time = '$sleep_time' WHERE id = '$user_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Sleep time updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
