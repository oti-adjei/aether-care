import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import {  createActionableStepSchema,
  updateActionableStepSchema, } from './validation';
import { ActionableStepsService } from './service';

const _logger = new Logger('Meidcal History');

export class ActionableStepsController {
  static async createActionableStep(req: Request, res: Response) {
    try {
      const payload = createActionableStepSchema.parse(req.body);

      const step = await ActionableStepsService.createActionableStep(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Actionable step created successfully',
        code: StatusCodes.CREATED,
        data: step,
      });
    } catch (error) {
      _logger.error(
        '[ActionableStepsController]::Something went wrong when creating actionable step',
        error,
      );
      throw error;
    }
  }

  static async fetchActionableStep(req: Request, res: Response) {
    try {
      const { step_id } = createActionableStepSchema.parse(req.params);

      const step = await ActionableStepsService.createActionableStep(step_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Actionable step fetched successfully',
        code: StatusCodes.OK,
        data: step,
      });
    } catch (error) {
      _logger.error(
        '[ActionableStepsController]::Something went wrong when fetching actionable step',
        error,
      );
      throw error;
    }
  }

  static async fetchAllActionableSteps(req: Request, res: Response) {
    try {
      const steps = await ActionableStepsService.fetchAllActionableSteps();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Actionable steps fetched successfully',
        code: StatusCodes.OK,
        data: steps,
      });
    } catch (error) {
      _logger.error(
        '[ActionableStepsController]::Something went wrong when fetching all actionable steps',
        error,
      );
      throw error;
    }
  }

  static async updateActionableStep(req: Request, res: Response) {
    try {
      const { step_id } = createActionableStepSchema.parse(req.params);
      const payload = updateActionableStepSchema.parse(req.body);

      const step = await ActionableStepsService.updateActionableStep(step_id, payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Actionable step updated successfully',
        code: StatusCodes.OK,
        data: step,
      });
    } catch (error) {
      _logger.error(
        '[ActionableStepsController]::Something went wrong when updating actionable step',
        error,
      );
      throw error;
    }
  }

  static async deleteActionableStep(req: Request, res: Response) {
    try {
      const { step_id } = createActionableStepSchema.parse(req.params);

      await ActionableStepsService.deleteActionableStep(step_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Actionable step deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: null,
      });
    } catch (error) {
      _logger.error(
        '[ActionableStepsController]::Something went wrong when deleting actionable step',
        error,
      );
      throw error;
    }
  }
}
