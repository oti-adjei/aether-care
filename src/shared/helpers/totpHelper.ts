import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export class TotpHelper {
  static generateTotpSecret() {
    const secret = speakeasy.generateSecret({ length: 20 });

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url,
    };
  }

  static async generateTotpQrCode(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  }

  static verifyTotp(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}
