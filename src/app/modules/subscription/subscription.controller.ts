import { Request, Response } from "express";
import { subscriptionService } from "./subscription.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { string } from "./../../../../node_modules/zod/v4/mini/schemas";

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await subscriptionService.createPackage(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Package created successfully!",
    data: result,
  });
});

const getAllPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionService.getAllPackage();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "All package get successfully!",
    data: result,
  });
});

const getSinglePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await subscriptionService.getSinglePackage(id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "All package get successfully!",
    data: result,
  });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await subscriptionService.updatePackage(id as string, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Package updated successfully!",
    data: result,
  });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await subscriptionService.deletePackage(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Package deleted successfully!",
    data: result,
  });
});

export const subscriptionController = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
