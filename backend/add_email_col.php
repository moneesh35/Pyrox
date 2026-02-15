<?php
include 'db.php';

$sql = "ALTER TABLE users ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE AFTER name";

if ($conn->query($sql) === TRUE) {
    echo "Table users altered successfully. Added email column.";
} else {
    echo "Error altering table: " . $conn->error;
}

$conn->close();
?>
