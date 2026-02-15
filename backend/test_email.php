<?php
// test_email.php
// A simple script to test if the PHP mail() function is working properly.

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>PHP Email Test</h1>";

// Check if email is passed as GET parameter, otherwise use a placeholder or ask user to provide one.
// For safety, we'll try to send to the developer/user if they provided one, or a dummy one.
$to = "test@example.com"; 
if (isset($_GET['to'])) {
    $to = $_GET['to'];
}

$subject = "Test Email from MedAlert Localhost";
$message = "This is a test email sent from the PHP script to verify functionality.\nTime: " . date("Y-m-d H:i:s");
$headers = "From: no-reply@medalert.localhost";

echo "<p>Attempting to send email to: <strong>$to</strong></p>";
echo "<p>Subject: $subject</p>";

// Check configuration
echo "<h2>Configuration Check:</h2>";
echo "<ul>";
echo "<li>SMTP: " . ini_get("SMTP") . "</li>";
echo "<li>smtp_port: " . ini_get("smtp_port") . "</li>";
echo "<li>sendmail_from: " . ini_get("sendmail_from") . "</li>";
echo "<li>sendmail_path: " . ini_get("sendmail_path") . "</li>";
echo "</ul>";

// Try sending
$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo "<h3 style='color: green;'>Success: PHP reported that the email was accepted for delivery.</h3>";
    echo "<p>Note: This does not guarantee it will reach the inbox. It relies on the local SMTP server/MTA.</p>";
} else {
    echo "<h3 style='color: red;'>Failure: PHP function mail() returned false.</h3>";
    echo "<p>Please check your php.ini configuration and ensure you have a mail server (like Sendmail, Postfix, or a tool like MailHog/Papercut for local dev) running.</p>";
}
?>
