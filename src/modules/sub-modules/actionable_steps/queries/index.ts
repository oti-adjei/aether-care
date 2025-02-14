export const actionableStepsQueries = {
    createActionableStep: `INSERT INTO actionable_steps (patient_id, step_description, status) VALUES ($1, $2, $3) RETURNING *;`,
    fetchActionableStep: `SELECT * FROM actionable_steps WHERE id = $1;`,
    fetchAllActionableSteps: `SELECT * FROM actionable_steps;`,
    updateActionableStep: `UPDATE actionable_steps SET step_description = $1, status = $2 WHERE id = $3 RETURNING *;`,
    deleteActionableStep: `UPDATE actionable_steps SET deleted_at = NOW() WHERE id = $1 RETURNING *;`,
    restoreActionableStep: `UPDATE actionable_steps SET deleted_at = NULL WHERE id = $1 RETURNING *;`,
    cancelActionableStepsByPatientId: `UPDATE actionable_steps SET is_cancelled = TRUE WHERE patient_id = $1;`
  };