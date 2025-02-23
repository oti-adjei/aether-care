// /* Replace with your SQL commands */
// CREATE TABLE actionable_steps (
//   step_id SERIAL PRIMARY KEY,
//   patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
//   note_id INT REFERENCES doctor_notes(note_id) ON DELETE CASCADE,
//   step_type VARCHAR(50) CHECK (step_type IN ('checklist', 'plan')),
//   description TEXT NOT NULL,
//   scheduled_for TIMESTAMP,
//   completed BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMP DEFAULT NOW()
// );
export const actionableStepsQueries = {
    createActionableStep: `INSERT INTO actionable_steps (patient_id, note_id, step_type, description, scheduled_for, completed,status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    fetchActionableStep: `SELECT * FROM actionable_steps WHERE id = $1;`,
    fetchAllActionableSteps: `SELECT * FROM actionable_steps;`,
    fetchActionableStepsByPatient: `SELECT * FROM actionable_steps WHERE patient_id = $1;`,
    // fetchActionableStepsByDoctor: `SELECT * FROM actionable_steps WHERE doctor_id = $1;`,
    updateActionableStep: `UPDATE actionable_steps SET description = $1, scheduled_for = $2 WHERE id = $3 RETURNING *;`,
    deleteActionableStep: `UPDATE actionable_steps SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
    restoreActionableStep: `UPDATE actionable_steps SET deleted_at = NULL WHERE id = $1 RETURNING *;`,
    //cancel Actinoable Step by setting statusfields with null or pending to cancelled
    cancelActionableStepsByPatientId: `UPDATE actionable_steps SET status = 'cancelled' WHERE patient_id = $1 AND status IN (NULL, 'pending') RETURNING *;`
  };