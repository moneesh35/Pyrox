<?php
// Simple Health Check
echo json_encode([
    "status" => "running",
    "message" => "MedAlert Backend is operational",
    "timestamp" => date("Y-m-d H:i:s")
]);
?>
