import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { UserService } from '../users/user/service';
import { StatusCodes } from 'http-status-codes';
import {  FetchMedicalHistoryByIdSchema, 
  FetchMedicalHistoryByPatientSchema, 
  CreateMedicalHistorySchema, 
  UpdateMedicalHistorySchema, 
  DeleteMedicalHistorySchema  } from './validation';
import { TotpHelper } from '../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

import { sqlQuest } from '../database/sqlQuest';
import { _logger } from '../utils/logger';
import { actionableStepsQueries } from '../queries/actionableStepsQueries';

export class ActionableStepsRepository {
  static async createActionableStep(patientId: number, step: string, dueDate: Date) {
    try {
      const actionableStep = await sqlQuest.one(actionableStepsQueries.createActionableStep, [patientId, step, dueDate]);
      return actionableStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when creating actionable step', error);
      throw error;
    }
  }

  static async fetchActionableSteps(patientId: number) {
    try {
      const steps = await sqlQuest.manyOrNone(actionableStepsQueries.fetchActionableSteps, [patientId]);
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when fetching actionable steps', error);
      throw error;
    }
  }

  static async updateActionableStep(stepId: number, step: string, dueDate: Date) {
    try {
      const updatedStep = await sqlQuest.oneOrNone(actionableStepsQueries.updateActionableStep, [stepId, step, dueDate]);
      return updatedStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when updating actionable step', error);
      throw error;
    }
  }

  static async deleteActionableStep(stepId: number) {
    try {
      const deletedStep = await sqlQuest.oneOrNone(actionableStepsQueries.deleteActionableStep, [stepId]);
      return deletedStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when deleting actionable step', error);
      throw error;
    }
  }
}
