import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { folderService } from "./folder.services";

const createFolder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const { name, parentId } = req.body;

  if (!name) throw new Error("Folder name is required");

  const result = await folderService.createFolder({
    userId,
    name,
    parentId,
  });

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Folder created successfully",
    data: result,
  });
});

const getUserFolders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const result = await folderService.getUserFolders(userId);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Folders retrieved successfully",
    data: result,
  });
});

const getSingleFolder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const folderIdParam = req.params.id;

  if (!folderIdParam || Array.isArray(folderIdParam)) {
    throw new Error("Invalid folder ID");
  }

  const result = await folderService.getSingleFolder(userId, folderIdParam);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Folder retrieved successfully",
    data: result,
  });
});

const updateFolder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const folderIdParam = req.params.id;

  if (!folderIdParam || Array.isArray(folderIdParam)) {
    throw new Error("Invalid folder ID");
  }

  const { name } = req.body;
  if (!name) throw new Error("Folder name is required");

  const result = await folderService.updateFolder({
    userId,
    folderId: folderIdParam,
    name,
  });

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Folder updated successfully",
    data: result,
  });
});

const deleteFolder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const { id } = req.params;

  const result = await folderService.deleteFolder(userId, id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Folder deleted successfully",
    data: result,
  });
});

export const folderController = {
  createFolder,
  getUserFolders,
  getSingleFolder,
  updateFolder,
  deleteFolder,
};
