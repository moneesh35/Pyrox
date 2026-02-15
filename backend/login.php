<?php
// login.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->phone) && isset($data->password)) {
    $phone = $conn->real_escape_string($data->phone);
    $password = $data->password;

    $sql = "SELECT id, name, email, password FROM users WHERE phone = '$phone'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user_id" => $row['id'],
                "user_name" => $row['name'],
                "email" => $row['email']
            ]);

            // Send Login Notification Email
            $to = $row['email'];
            $subject = "MedAlert Login Notification";
            $message = "Hello " . $row['name'] . ",\n\nYou have successfully logged in to MedAlert.\n\nTime: " . date("Y-m-d H:i:s");
            $headers = "From: no-reply@medalert.com";

            // Use @ to suppress warnings if mail server is not configured
            @mail($to, $subject, $message, $headers);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
$conn->close();
?>
