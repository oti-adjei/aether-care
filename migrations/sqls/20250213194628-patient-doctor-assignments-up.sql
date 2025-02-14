CREATE TABLE patient_doctor_assignments (
    assignment_id SERIAL PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (patient_id, doctor_id)  -- Ensures each patient has only one assigned doctor
);
