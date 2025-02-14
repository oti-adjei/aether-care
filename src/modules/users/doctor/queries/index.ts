export const doctorQueries = {
  createDoctor: `INSERT INTO doctors (first_name, surname, email, specialization) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchDoctor: `SELECT * FROM doctors WHERE id = $1;`,
  fetchDoctorByEmail: `SELECT * FROM doctors WHERE email = $1;`,
  fetchAllDoctors: `SELECT * FROM doctors;`,
  updateDoctor: `UPDATE doctors SET first_name = $1, surname = $2, email = $3, specialization = $4 WHERE id = $5 RETURNING *;`,
  deleteDoctor: `UPDATE doctors SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
  restoreDoctor: `UPDATE doctors SET deleted_at = NULL WHERE id = $1 RETURNING *;`
};