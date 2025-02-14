export const patientDoctorAssignmentQueries = {
    createAssignment: `INSERT INTO patient_doctor_assignments (doctor_id, patient_id) VALUES ($1, $2) RETURNING *;`,
    fetchAssignment: `SELECT * FROM patient_doctor_assignments WHERE id = $1;`,
    fetchAssignmentsByPatient: `SELECT * FROM patient_doctor_assignments WHERE patient_id = $1;`,
    fetchAssignmentsByDoctor: `SELECT * FROM patient_doctor_assignments WHERE doctor_id = $1;`,
    fetchAllAssignments: `SELECT * FROM patient_doctor_assignments;`,
    fetchDoctorsByPatient: `SELECT * FROM patient_doctor_assignments WHERE patient_id = $1;`,
    deleteAssignment: `DELETE FROM patient_doctor_assignments WHERE id = $1 RETURNING *;`
  };