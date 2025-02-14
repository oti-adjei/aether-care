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
export class ActionableStepsService {
  static createActionableStep = async (patientId: number, doctorId: number, stepDetails: string) => {
    try {
      const step = await ActionableStepsRepository.createActionableStep(patientId, doctorId, stepDetails);
      if (!step) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create actionable step');
      }
      return step;
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error creating actionable step', error);
      throw error;
    }
  };

  static fetchStepsByPatient = async (patientId: number) => {
    try {
      const steps = await ActionableStepsRepository.fetchStepsByPatient(patientId);
      if (!steps || steps.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No actionable steps found for this patient');
      }
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error fetching actionable steps by patient', error);
      throw error;
    }
  };

  static fetchStepsByDoctor = async (doctorId: number) => {
    try {
      const steps = await ActionableStepsRepository.fetchStepsByDoctor(doctorId);
      if (!steps || steps.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No actionable steps found for this doctor');
      }
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error fetching actionable steps by doctor', error);
      throw error;
    }
  };

  static updateActionableStep = async (stepId: number, stepDetails: string) => {
    try {
      const updatedStep = await ActionableStepsRepository.updateActionableStep(stepId, stepDetails);
      if (!updatedStep) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Actionable step not found or could not be updated');
      }
      return updatedStep;
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error updating actionable step', error);
      throw error;
    }
  };

  static deleteActionableStep = async (stepId: number) => {
    try {
      const deleted = await ActionableStepsRepository.deleteActionableStep(stepId);
      if (!deleted) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Actionable step not found or could not be deleted');
      }
      return { message: 'Actionable step deleted successfully' };
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error deleting actionable step', error);
      throw error;
    }
  };
}
