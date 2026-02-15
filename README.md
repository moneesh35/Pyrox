# MedAlert - Medicine Reminder System

A full-stack medicine reminder application built with React (Frontend) and Core PHP (Backend) using MySQL Database.

## Prerequisites
- **MySQL / MariaDB** installed (e.g., via XAMPP, WAMP, or standalone).
- **PHP** installed with `mysqli` and `curl` extensions enabled.
- **Node.js** and **npm** installed.

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (phpMyAdmin, Workbench, or CLI).
2. Create a new database named `medalert_db`.
3. Import the script located at `backend/database_mysql.sql`.

### 2. Backend Setup
1. Navigate to the `backend` folder.
2. Open `db.php` and verify your MySQL credentials (default: `root`, no password).
3. Start the PHP server on port 8000:
   ```bash
   php -S localhost:8000
   ```
   *Keep this terminal open.*

### 3. Frontend Setup
1. Navigate to the `frontend` folder.
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *This will open the app in your browser at http://localhost:3000.*

## SMS Notification (Cron Job)
The script `backend/send_reminders.php` checks for reminders.
- **Manual Test**: Run `php backend/send_reminders.php` in your terminal.
- **Windows Task Scheduler**: Schedule this script to run every minute for automated reminders.

## Folder Structure
- **backend/**: PHP API files and database script.
- **frontend/**: React application source code.
