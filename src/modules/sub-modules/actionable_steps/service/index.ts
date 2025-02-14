
import { StatusCodes } from 'http-status-codes';
import { ApiError } from 'src/shared/utils/api.error';
import { ActionableStepsRepository } from '../repository';
import Logger from '../../../../config/logger';

const _logger = new Logger('Meidcal History');
export class ActionableStepsService {
  static createActionableStep = async (payload:any) => {
    try {
      const {patientId,doctorId,stepDetails} = payload;
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
      const steps = await ActionableStepsRepository.fetchActionableStepsByPatient(patientId);
      if (!steps || steps.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No actionable steps found for this patient');
      }
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsService]::Error fetching actionable steps by patient', error);
      throw error;
    }
  };

  // static fetchStepsByDoctor = async (doctorId: number) => {
  //   try {
  //     const steps = await ActionableStepsRepository.fetchActionableStepsByDoctor(doctorId);
  //     if (!steps || steps.length === 0) {
  //       throw new ApiError(StatusCodes.NOT_FOUND, 'No actionable steps found for this doctor');
  //     }
  //     return steps;
  //   } catch (error) {
  //     _logger.error('[ActionableStepsService]::Error fetching actionable steps by doctor', error);
  //     throw error;
  //   }
  // };

static fetchAllActionableSteps = async () => {
  try {
    const steps = await ActionableStepsRepository.fetchAllActionableSteps();
    if (!steps || steps.length === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No actionable steps found');
    }
    return steps;
  } catch (error) {
    _logger.error('[ActionableStepsService]::Error fetching all actionable steps', error);
    throw error;
  }
};

  static updateActionableStep = async (stepId: number, payload:any) => {
    const { step_type, description, scheduled_for, completed } = payload;
    try {
      const updatedStep = await ActionableStepsRepository.updateActionableStep(stepId,step_type, description, scheduled_for, completed );
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
