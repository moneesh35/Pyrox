<?php
// send_reminders.php
include 'db.php';

// Function to send SMS (Fast2SMS)
// Function to send SMS (Fast2SMS)
function sendSMS($phone, $message) {
    // FIX: Added quotes around the API key
    $apiKey = "rtwPngfUG7ONAa6ZLmdVib3sv2pQT5EReCYyuMFK4oXS90JI1xrtN1aRi2MB0dyUoOGCFuxkVEQ9SpsY";
    $message = urlencode($message);
    $url = "https://www.fast2sms.com/dev/bulkV2?authorization=$apiKey&route=q&message=$message&flash=0&numbers=$phone";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Fix for local SSL issues
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo "SMS Curl Error: " . curl_error($ch) . "\n";
    } else {
        echo "SMS Response: " . $response . "\n";
    }
    
    curl_close($ch);
    return $response;
}

// Function to send WhatsApp (CallMeBot - Free Personal API)
function sendWhatsApp($phone, $message) {
    // NOTE: CallMeBot requires setup: Add +34 644 66 32 62 to contacts, send "I allow callmebot to send me messages"
    // you need to get your personal apikey from the bot
    $apiKey = "YOUR_CALLMEBOT_API_KEY"; 
    $message = urlencode($message);
    $url = "https://api.callmebot.com/whatsapp.php?phone=$phone&text=$message&apikey=$apiKey";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Fix for local SSL issues
    $result = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo "WhatsApp Curl Error: " . curl_error($ch) . "\n";
    }
    
    curl_close($ch);
    return $result;
}

// 1. Get current time (HH:MM)
date_default_timezone_set('Asia/Kolkata'); // Set your timezone
$current_time = date("H:i");
$current_date = date("Y-m-d");

echo "Running reminder check at: " . $current_time . " on " . $current_date . "\n";

// 2. Query MySQL
$sql = "SELECT m.id, m.medicine_name, m.dosage, m.message, u.phone, u.name, u.id as user_id 
        FROM medicines m 
        JOIN users u ON m.user_id = u.id 
        WHERE m.is_active = 1 
        AND '$current_date' BETWEEN m.start_date AND m.end_date
        AND m.reminder_time = '$current_time'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $phone = $row['phone'];
        $name = $row['name'];
        $medicine = $row['medicine_name'];
        $dosage = $row['dosage'];
        $custom_msg = $row['message'];
        
        $sms_text = "Hello $name, it's time to take your medicine: $medicine ($dosage). $custom_msg";
        
        // Send SMS
        sendSMS($phone, $sms_text);

        // Send WhatsApp (Uncomment if API key is set)
        sendWhatsApp($phone, $sms_text);
        
        // Log to database
        $user_id_log = $row['user_id'];
        $safe_medicine = $conn->real_escape_string($medicine);
        $safe_message = $conn->real_escape_string($sms_text);
        
        $log_sql = "INSERT INTO notifications (user_id, medicine_name, message) VALUES ('$user_id_log', '$safe_medicine', '$safe_message')";
        if (!$conn->query($log_sql)) {
             echo "SQL Error: " . $conn->error . "\n";
        }

        echo "Reminder sent to $name ($phone) for $medicine.\n";
    }
} else {
    echo "No reminders to send at this time.\n";
}

// 3. Check for Sleep Reminders
// Logic: If current time == user's sleep time, send a "Good Night" message.
$sleep_sql = "SELECT id, name, phone, sleep_time FROM users WHERE sleep_time = '$current_time'";
$sleep_result = $conn->query($sleep_sql);

if ($sleep_result->num_rows > 0) {
    while ($row = $sleep_result->fetch_assoc()) {
        $phone = $row['phone'];
        $name = $row['name'];
        $sleep_msg = "Good Night $name! It's your scheduled sleep time. Have a restful sleep! 🌙";

        // Send WhatsApp (Uncomment if API key is set)
        sendWhatsApp($phone, $sleep_msg);
        
        echo "Sleep reminder sent to $name ($phone).\n";
    }
}

$conn->close();
?>

