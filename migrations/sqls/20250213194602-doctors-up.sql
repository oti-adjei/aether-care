/* Replace with your SQL commands */
CREATE TABLE doctors (
    doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    specialty VARCHAR(255),
    experience INTEGER CHECK (experience >= 0),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    totp_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
