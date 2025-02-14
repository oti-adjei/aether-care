export const patientDoctorAssignmentQueries = {
    createAssignment: `INSERT INTO patient_doctor_assignments (doctor_id, patient_id) VALUES ($1, $2) RETURNING *;`,
    fetchAssignment: `SELECT * FROM patient_doctor_assignments WHERE id = $1;`,
    fetchAllAssignments: `SELECT * FROM patient_doctor_assignments;`,
    deleteAssignment: `DELETE FROM patient_doctor_assignments WHERE id = $1 RETURNING *;`
  };