/* Replace with your SQL commands */
CREATE TABLE doctor_notes (
    note_id SERIAL PRIMARY KEY,
    doctor_id UUID REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    encrypted_notes TEXT NOT NULL, -- End-to-end encrypted
    iv TEXT NOT NULL, -- IV for decryption
    created_at TIMESTAMP DEFAULT NOW()
);
