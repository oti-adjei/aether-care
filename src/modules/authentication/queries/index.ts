export const authQueries = {
     getTotpSecret : 'SELECT totp_secret FROM users WHERE id = $1;',
     saveTotpSecret :'UPDATE users SET totp_secret = $1 WHERE id = $2;',
      fetchUser: 'SELECT * FROM personal WHERE id = $1',
      storeGhanaCard: 'UPDATE personal SET ghana_card_images = COALESCE($2::jsonb, ghana_card_images) WHERE id = $1 RETURNING *',
       //fetchAllUsers :`SELECT * FROM personal;`,
      uploadImage :`UPDATE personal SET public_id = COALESCE($1, public_id),secure_url = COALESCE($2, secure_url) WHERE id = $3  RETURNING *`,
      fetchAllUsers :`SELECT id, city, email, first_name, ghana_ecowas_number, is_verified, mobile_number, surname, type, whatsapp_number, is_verified,created_at FROM personal;`,
      fetchUserByEmail: 'SELECT * FROM personal WHERE email = $1',
      updateUser: 'UPDATE personal SET name = COALESCE($1, name),email = COALESCE($2, email),password = COALESCE($3, password) WHERE id = $4 RETURNING *;',
      deleteUser: 'DELETE FROM personal WHERE id = $1 RETURNING *',
      checkIfUserExists: `SELECT * FROM personal WHERE LOWER("email") = LOWER($1);`,
      createPersonalUser: 'INSERT INTO personal (first_name, surname , email, ghana_ecowas_number, mobile_number, whatsapp_number, city , password,type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      getUserByPhoneNumber: `SELECT id, first_name, surname , email, ghana_ecowas_number, mobile_number, whatsapp_number, city , password FROM personal WHERE mobile_number = $1`,
      storeOtp :`INSERT INTO otp (user_id, user_type) VALUES ($1, $2) RETURNING *`,
      updateOtp :`UPDATE otp SET otp = $1 WHERE user_id = $2 AND user_type = $3`,
      updateVerifiedfield :`UPDATE personal SET is_verified = true WHERE id = $1`,
      checkVerified :`SELECT is_verified FROM personal WHERE id = $1`,
      fetchOtp: 'SELECT * FROM otp WHERE user_id =$1 AND user_type = $2'
    
  }
