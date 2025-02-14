export const medicalHistoryQueries = {
    createMedicalHistory: `INSERT INTO medical_histories (patient_id, doctor_id, details) VALUES ($1, $2, $3) RETURNING *;`,
    fetchMedicalHistory: `SELECT * FROM medical_histories WHERE id = $1;`,
    fetchAllMedicalHistories: `SELECT * FROM medical_histories;`,
    updateMedicalHistory: `UPDATE medical_histories SET details = $1 WHERE id = $2 RETURNING *;`,
    deleteMedicalHistory: `UPDATE medical_histories SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
    restoreMedicalHistory: `UPDATE medical_histories SET deleted_at = NULL WHERE id = $1 RETURNING *;`
  };