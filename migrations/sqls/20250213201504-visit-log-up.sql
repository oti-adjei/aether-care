/* Replace with your SQL commands */
CREATE TABLE visit_log (
    visit_id SERIAL PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    visited_at TIMESTAMP DEFAULT NOW()
);
