/* Replace with your SQL commands */
CREATE TABLE medical_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES patients(user_id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(user_id) ON DELETE SET NULL,
    condition TEXT NOT NULL,
    diagnosed_at DATE NOT NULL,
    treatment_plan TEXT,  -- Optional field for planned treatments
    notes TEXT,  -- Additional details
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    deleted_at TIMESTAMP
);
