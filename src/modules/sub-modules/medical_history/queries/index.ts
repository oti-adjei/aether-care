export const medicalHistoryQueries = {
    createMedicalHistory: `INSERT INTO medical_history (patient_id, doctor_id, condition, treatment_plan, notes, diagnosed_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    fetchMedicalHistory: `SELECT * FROM medical_history WHERE id = $1;`,
    fetchMedicalHistoryByPatientId: `SELECT * FROM medical_history WHERE patient_id = $1;`,
    fetchAllMedicalHistories: `SELECT * FROM medical_history;`,
    updateMedicalHistory: `UPDATE medical_history SET details = $1 WHERE id = $2 RETURNING *;`,
    deleteMedicalHistory: `UPDATE medical_history SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
    restoreMedicalHistory: `UPDATE medical_history SET deleted_at = NULL WHERE id = $1 RETURNING *;`
  };