<?php
// delete_medicine.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $conn->real_escape_string($data->id);

    $sql = "DELETE FROM medicines WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Medicine deleted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Delete failed: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
$conn->close();
?>
