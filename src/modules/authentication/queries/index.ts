export class authQueries {
    static getTotpSecret = `
      SELECT totp_secret FROM users WHERE id = $1;
    `;
  
    static saveTotpSecret = `
      UPDATE users SET totp_secret = $1 WHERE id = $2;
    `;
  }