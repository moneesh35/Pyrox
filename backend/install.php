<?php
// install.php
include 'db.php';

// SQL to create tables (copied from database_mysql.sql)
$sql = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    sleep_time VARCHAR(5) DEFAULT '22:00',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    reminder_time VARCHAR(5) NOT NULL, 
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    message VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
";

// Execute Multi Query
if ($conn->multi_query($sql)) {
    echo "<h1>Database Installation Successful!</h1>";
    echo "<p>Tables 'users', 'medicines', and 'notifications' have been created.</p>";
    echo "<p>You can now delete this file and start using the app.</p>";
} else {
    echo "<h1>Error installing database:</h1>";
    echo "<p>" . $conn->error . "</p>";
}

$conn->close();
?>
