import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { adminQueries } from '../queries';

const _logger = new Logger('UserRepository');



export class AdminRepository {
  static fetchAdmin(id: string) {
   try {
     const admin = sqlQuest.oneOrNone(adminQueries.fetchAdmin, [id]);
     return admin;
   } catch (error) {
     _logger.error('[AdminRepository]::Something went wrong when fetching admin', error);
     throw error;
   }
  }
  static fetchAdminByEmail(email: string) {
   try {
     const admin = sqlQuest.oneOrNone(adminQueries.fetchAdminByEmail, [email]);
     return admin;
   } catch (error) {
     _logger.error('[AdminRepository]::Something went wrong when fetching admin by email', error);
     throw error;
   }
  }

  static async fetchAllAdmins() {
    try {
      const admins = await sqlQuest.manyOrNone(adminQueries.fetchAllAdmins);
      return admins;
    } catch (error) {
      _logger.error('[AdminRepository]::Something went wrong when fetching all admins', error);
      throw error;
    }
  }

  static async createAdmin(firstName: string, lastName: string, email: string, phoneNumber: string, role: string) {
    try {
      const admin = await sqlQuest.one(adminQueries.createAdmin, [firstName, lastName, email, phoneNumber, role]);
      return admin;
    } catch (error) {
      _logger.error('[AdminRepository]::Something went wrong when creating admin', error);
      throw error;
    }
  }


  static async updateAdmin(adminId: number, firstName: string | null, lastName: string | null, email: string | null, phoneNumber: string | null, role: string | null) {
    try {
      const updatedAdmin = await sqlQuest.one(adminQueries.updateAdmin, [firstName, lastName, email, phoneNumber, role, adminId]);
      return updatedAdmin;
    } catch (error) {
      _logger.error('[AdminRepository]::Something went wrong when updating admin', error);
      throw error;
    }
  }

  static async deleteAdmin(adminId: number) {
    try {
      const deletedAdmin = await sqlQuest.oneOrNone(adminQueries.deleteAdmin, [adminId]);
      return deletedAdmin;
    } catch (error) {
      _logger.error('[AdminRepository]::Something went wrong when deleting admin', error);
      throw error;
    }
  }
}
