/* Replace with your SQL commands */
CREATE TABLE otps (
    otp_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,  -- Links OTP to a user
    user_role VARCHAR(50) CHECK (user_role IN ('doctor', 'patient','admin')),
    otp_code VARCHAR(6) NOT NULL,  -- Stores the OTP (e.g., 6-digit code)
    expires_at TIMESTAMP NOT NULL, -- Expiration time
    is_used BOOLEAN DEFAULT FALSE, -- Tracks if OTP has been used
    created_at TIMESTAMP DEFAULT NOW()
);
