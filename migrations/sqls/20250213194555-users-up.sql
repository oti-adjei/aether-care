/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('doctor', 'patient', 'admin')) NOT NULL,
    is_verified BOOLEAN DEFAULT false
    created_at TIMESTAMP DEFAULT NOW()
);
