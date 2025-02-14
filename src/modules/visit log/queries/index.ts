export const visitLogQueries = {
    createVisitLog: `INSERT INTO visit_logs (patient_id, doctor_id, visit_date) VALUES ($1, $2, $3) RETURNING *;`,
    fetchVisitLog: `SELECT * FROM visit_logs WHERE id = $1;`,
    fetchAllVisitLogs: `SELECT * FROM visit_logs;`,
    deleteVisitLog: `DELETE FROM visit_logs WHERE id = $1 RETURNING *;`
  };