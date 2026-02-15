<?php
// get_medicines.php
include 'db.php';

if (isset($_GET['user_id'])) {
    $user_id = $conn->real_escape_string($_GET['user_id']);

    $sql = "SELECT id, medicine_name, dosage, reminder_time, 
            start_date, end_date, message, is_active 
            FROM medicines WHERE user_id = '$user_id'";
            
    $result = $conn->query($sql);

    $medicines = [];
    while ($row = $result->fetch_assoc()) {
        $medicines[] = $row;
    }

    echo json_encode($medicines);
} else {
    echo json_encode(["status" => "error", "message" => "User ID missing"]);
}
$conn->close();
?>
