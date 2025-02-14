export const adminQueries = {
  fetchAdminByEmail: `SELECT * FROM admins WHERE email = $1;`,
  createAdmin: `INSERT INTO admins (first_name, surname, email, role) VALUES ($1, $2, $3, $4) RETURNING *;`,
  fetchAdmin: `SELECT * FROM admins WHERE id = $1;`,
  fetchAllAdmins: `SELECT * FROM admins;`,
  updateAdmin: `UPDATE admins SET first_name = $1, surname = $2, email = $3, role = $4 WHERE id = $5 RETURNING *;`,
  deleteAdmin: `UPDATE admins SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
  restoreAdmin: `UPDATE admins SET deleted_at = NULL WHERE id = $1 RETURNING *;`
};