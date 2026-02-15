<?php
// update_schema.php
include 'db.php';

// Check if 'email' column exists in 'users' table
$check_sql = "SHOW COLUMNS FROM users LIKE 'email'";
$result = $conn->query($check_sql);

if ($result->num_rows == 0) {
    // Column doesn't exist, add it
    $alter_sql = "ALTER TABLE users ADD COLUMN email VARCHAR(255) NOT NULL AFTER name";
    if ($conn->query($alter_sql) === TRUE) {
        echo "Successfully added 'email' column to 'users' table.";
    } else {
        echo "Error adding column: " . $conn->error;
    }
} else {
    echo "'email' column already exists.";
}

$conn->close();
?>
