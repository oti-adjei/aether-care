export const patientQueries = {
  createPatient: `INSERT INTO patients (first_name, surname, email, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchPatient: `SELECT * FROM patients WHERE id = $1;`,
  fetchPatientByEmail: `SELECT * FROM patients WHERE email = $1;`,
  fetchAllPatients: `SELECT * FROM patients;`,
  updatePatient: `UPDATE patients SET first_name = $1, surname = $2, email = $3, date_of_birth = $4 WHERE id = $5 RETURNING *;`,
  deletePatient: `UPDATE patients SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
  restorePatient: `UPDATE patients SET deleted_at = NULL WHERE id = $1 RETURNING *;`
};
