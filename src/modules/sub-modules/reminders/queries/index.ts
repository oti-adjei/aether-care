// CREATE TABLE reminders (
//     reminder_id SERIAL PRIMARY KEY,
//     patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
//     step_id INT REFERENCES actionable_steps(step_id) ON DELETE CASCADE,
//     reminder_time TIMESTAMP NOT NULL,
//     status VARCHAR(50) CHECK (status IN ('pending', 'sent', 'completed')) DEFAULT 'pending',
//     created_at TIMESTAMP DEFAULT NOW()
// );

export const remindersQueries = {
    createReminder: `INSERT INTO reminders (patient_id, step_id, reminder_time, status) VALUES ($1, $2, $3, $4) RETURNING *;`,
    fetchReminder: `SELECT * FROM reminders WHERE reminder_id = $1;`,
    fetchAllReminders: `SELECT * FROM reminders;`,
    fetchRemindersByPatient: `SELECT * FROM reminders WHERE patient_id = $1;`,
    updateReminder: `UPDATE reminders SET status = $1 WHERE reminder_id = $2 RETURNING *;`,
    deleteReminder: `UPDATE reminders SET deleted_at = NOW() WHERE reminder_id = $1 RETURNING *;`,
    restoreReminder: `UPDATE reminders SET deleted_at = NULL WHERE reminder_id = $1 RETURNING *;`
  };