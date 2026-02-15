-- Oracle Dictionary / Schema Setup for MedAlert

-- Users Table
CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    phone VARCHAR2(20) NOT NULL UNIQUE,
    password VARCHAR2(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for Users ID
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;

-- Trigger to auto-increment User ID
CREATE OR REPLACE TRIGGER users_bi
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SELECT users_seq.NEXTVAL INTO :new.id FROM dual;
END;
/

-- Medicines Table
CREATE TABLE medicines (
    id NUMBER PRIMARY KEY,
    user_id NUMBER NOT NULL,
    medicine_name VARCHAR2(100) NOT NULL,
    dosage VARCHAR2(50),
    reminder_time VARCHAR2(10), -- Storing as HH:MM
    start_date DATE,
    end_date DATE,
    message VARCHAR2(255),
    is_active NUMBER(1) DEFAULT 1, -- 0 for inactive, 1 for active
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sequence for Medicines ID
CREATE SEQUENCE medicines_seq START WITH 1 INCREMENT BY 1;

-- Trigger to auto-increment Medicine ID
CREATE OR REPLACE TRIGGER medicines_bi
BEFORE INSERT ON medicines
FOR EACH ROW
BEGIN
  SELECT medicines_seq.NEXTVAL INTO :new.id FROM dual;
END;
/
