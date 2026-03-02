import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await authServices.getAllUsers();

  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

const getUserDetails = catchAsync(async (req: Request, res) => {
  const { id } = req.params;

  const user = await authServices.getUserDetails(id as string);

  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "User details fetched successfully",
    data: user,
  });
});

export const authController = {
  getAllUsers,
  getUserDetails,
};
