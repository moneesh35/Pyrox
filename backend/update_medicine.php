<?php
// update_medicine.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $conn->real_escape_string($data->id);
    $medicine_name = $conn->real_escape_string($data->medicine_name);
    $dosage = $conn->real_escape_string($data->dosage);
    $reminder_time = $conn->real_escape_string($data->reminder_time);
    $start_date = $conn->real_escape_string($data->start_date);
    $end_date = $conn->real_escape_string($data->end_date);
    $message = $conn->real_escape_string($data->message);
    $is_active = $conn->real_escape_string($data->is_active);

    $sql = "UPDATE medicines SET 
            medicine_name = '$medicine_name', 
            dosage = '$dosage', 
            reminder_time = '$reminder_time', 
            start_date = '$start_date', 
            end_date = '$end_date', 
            message = '$message', 
            is_active = '$is_active' 
            WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Medicine updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
$conn->close();
?>
