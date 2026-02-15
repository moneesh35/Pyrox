<?php
// add_medicine.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id) && isset($data->medicine_name)) {
    $user_id = $conn->real_escape_string($data->user_id);
    $medicine_name = $conn->real_escape_string($data->medicine_name);
    $dosage = $conn->real_escape_string($data->dosage);
    $reminder_time = $conn->real_escape_string($data->reminder_time);
    $start_date = $conn->real_escape_string($data->start_date);
    $end_date = $conn->real_escape_string($data->end_date);
    $message = $conn->real_escape_string($data->message);

    $sql = "INSERT INTO medicines (user_id, medicine_name, dosage, reminder_time, start_date, end_date, message)
            VALUES ('$user_id', '$medicine_name', '$dosage', '$reminder_time', '$start_date', '$end_date', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Medicine added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add medicine: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
$conn->close();
?>
