<?php
// register.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->phone) && isset($data->password) && isset($data->email)) {
    $name = $conn->real_escape_string($data->name);
    $phone = $conn->real_escape_string($data->phone);
    $email = $conn->real_escape_string($data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, phone, password) VALUES ('$name', '$email', '$phone', '$password')";

    try {
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        }
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) { // Duplicate entry
            echo json_encode(["status" => "error", "message" => "User with this phone number already exists"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
$conn->close();
?>
