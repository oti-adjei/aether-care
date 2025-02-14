export const visitLogQueries = {
    createVisitLog: `INSERT INTO visit_logs (patient_id, doctor_id, visit_date) VALUES ($1, $2, $3) RETURNING *;`,
    fetchVisitLog: `SELECT * FROM visit_logs WHERE id = $1;`,
    fetchAllVisitLogs: `SELECT * FROM visit_logs;`,
    fetchVisitLogsByPatient: `SELECT * FROM visit_logs WHERE patient_id = $1;`,
    fetchVisitLogsByDoctor: `SELECT * FROM visit_logs WHERE doctor_id = $1;`,
    updateVisitLog: `UPDATE visit_logs SET patient_id = $1, doctor_id = $2, visit_date = $3 WHERE id = $4 RETURNING *;`,
    deleteVisitLog: `DELETE FROM visit_logs WHERE id = $1 RETURNING *;`
  };