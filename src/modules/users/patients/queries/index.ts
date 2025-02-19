export const patientQueries = {
  createPatient: `INSERT INTO patients ( user_id,date_of_birth,medical_history,gender) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchPatient: `SELECT u.*, d.* FROM patients d INNER JOIN users u ON d.user_id = u.user_id WHERE u.user_id = $1;
`,
  fetchPatientByEmail: `SELECT d.* FROM patients d INNER JOIN users u ON d.user_id = u.user_id WHERE u.email = $1;`,
  fetchAllPatients: `SELECT * FROM patients;`,
  updatePatient: `UPDATE patients SET date_of_birth = COALESCE($1, date_of_birth), medical_history = COALESCE($2, medical_history), gender = COALESCE($3, gender) WHERE user_id = $4 RETURNING *;`,
  deletePatient: `DELETE FROM patients WHERE user_id = $1 RETURNING *;`,
  // restorePatient: `UPDATE patients SET deleted_at = NULL WHERE id = $1 RETURNING *;`
};
