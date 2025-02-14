export const doctorQueries = {
  createDoctor: `INSERT INTO doctors (user_id, license_number, experience, specialty) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchDoctor: `SELECT * FROM doctors WHERE user_id = $1;`,
  // fetchDoctorByEmail: `SELECT * FROM doctors WHERE email = $1;`,
  fetchDoctorByEmail: `SELECT d.* FROM doctors d INNER JOIN users u ON d.user_id = u.id WHERE u.email = $1;`,
  fetchAllDoctors: `SELECT * FROM doctors;`,
  updateDoctor: `UPDATE doctors SET experience = $1, specialty = $2, license_number = $3, WHERE user_id = $4 RETURNING *;`,
  deleteDoctor: `UPDATE doctors SET deleted_at = NOW() WHERE user_id = $1 RETURNING *;`,
  restoreDoctor: `UPDATE doctors SET deleted_at = NULL WHERE user_id = $1 RETURNING *;`
};