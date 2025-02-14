export const doctorNoteQueries = {
    createDoctorNote: `INSERT INTO doctor_notes (doctor_id, patient_id, note) VALUES ($1, $2, $3) RETURNING *;`,
    fetchDoctorNote: `SELECT * FROM doctor_notes WHERE id = $1;`,
    fetchAllDoctorNotes: `SELECT * FROM doctor_notes;`,
    updateDoctorNote: `UPDATE doctor_notes SET note = $1 WHERE id = $2 RETURNING *;`,
    deleteDoctorNote: `UPDATE doctor_notes SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
    restoreDoctorNote: `UPDATE doctor_notes SET deleted_at = NULL WHERE id = $1 RETURNING *;`
  };