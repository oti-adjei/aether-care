/* Replace with your SQL commands */
CREATE TABLE patients (
    patient_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(50) CHECK (gender IN ('male', 'female', 'other')),
    medical_history TEXT, -- Can be encrypted
    created_at TIMESTAMP DEFAULT NOW()
);
