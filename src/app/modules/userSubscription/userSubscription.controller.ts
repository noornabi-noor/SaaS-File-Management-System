import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userSubscriptionService } from "./userSubscription.services";

const selectPackage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized: User not found");

  const { packageId } = req.body;
  if (!packageId) throw new Error("Package ID is required");

  const result = await userSubscriptionService.selectPackage(userId, packageId);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Package selected successfully!",
    data: result,
  });
});

const getActivePackage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized: User not found");

  const result = await userSubscriptionService.getActivePackage(userId);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Active package retrieved successfully!",
    data: result,
  });
});

const getSubscriptionHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized: User not found");

  const result = await userSubscriptionService.getSubscriptionHistory(userId);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Subscription history retrieved successfully!",
    data: result,
  });
});

export const userSubscriptionController = {
  selectPackage,
  getActivePackage,
  getSubscriptionHistory,
};