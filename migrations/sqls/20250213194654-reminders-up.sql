/* Replace with your SQL commands */
CREATE TABLE reminders (
    reminder_id SERIAL PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    step_id INT REFERENCES actionable_steps(step_id) ON DELETE CASCADE,
    reminder_time TIMESTAMP NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'sent', 'completed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
