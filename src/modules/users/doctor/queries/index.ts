export const doctorQueries = {
  createDoctor: `INSERT INTO doctors (user_id, specialty, experience, license_number) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchDoctor: `SELECT d.* FROM doctors d INNER JOIN users u ON d.user_id = u.user_id WHERE u.user_id = $1;`,
  // fetchDoctorByEmail: `SELECT * FROM doctors WHERE email = $1;`,
  fetchDoctorByEmail: `SELECT d.* FROM doctors d INNER JOIN users u ON d.user_id = u.user_id WHERE u.email = $1;`,
  fetchAllDoctors: `SELECT * FROM doctors;`,
  updateDoctor: `UPDATE doctors SET experience = COALESCE($1, experience), specialty = COALESCE($2, specialty), license_number = COALESCE($3, license_number) WHERE user_id = $4 RETURNING *;`,
  deleteDoctor: `DELETE FROM doctors WHERE user_id = $1 RETURNING *;`,
  // deleteDoctor: `UPDATE doctors SET deleted_at = NOW() WHERE user_id = $1 RETURNING *;`,
  // restoreDoctor: `UPDATE doctors SET deleted_at = NULL WHERE user_id = $1 RETURNING *;`
};