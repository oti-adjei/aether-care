/* Replace with your SQL commands */
CREATE TABLE actionable_steps (
    step_id SERIAL PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    note_id INT REFERENCES doctor_notes(note_id) ON DELETE CASCADE,
    step_type VARCHAR(50) CHECK (step_type IN ('checklist', 'plan')),
    description TEXT NOT NULL,
    scheduled_for TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);
