export const adminQueries = {
  fetchAdminByEmail: `SELECT a.* FROM admins a INNER JOIN users u ON a.user_id = u.user_id WHERE u.email = $1;`,
  createAdmin: `INSERT INTO admins (user_id, role) VALUES ($1, $2) RETURNING *;`,
  fetchAdmin: `SELECT a.* FROM admins a INNER JOIN users u ON a.user_id = u.user_id WHERE u.user_id = $1`,
  fetchAllAdmins: `SELECT * FROM admins;`,
  updateAdmin: `UPDATE admins SET first_name = $1, surname = $2, email = $3, role = $4 WHERE id = $5 RETURNING *;`,
  deleteAdmin: `DELETE FROM admins WHERE user_id = $1 RETURNING *;`,
  restoreAdmin: `UPDATE admins SET deleted_at = NULL WHERE id = $1 RETURNING *;`
};