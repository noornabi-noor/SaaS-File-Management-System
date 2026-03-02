import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { fileService } from "./files.services";
import { sendResponse } from "../../shared/sendResponse";

export const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const { folderId } = req.params;
  const file = req.file;

  if (!folderId) throw new Error("Folder ID is required");
  if (!file) throw new Error("No file uploaded");

  const uploadedFile = await fileService.uploadFile(
    userId,
    folderId as string,
    file,
  );

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "File uploaded successfully",
    data: uploadedFile,
  });
});

export const getFilesInFolder = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { folderId } = req.params;

    if (!userId) throw new Error("Unauthorized");
    if (!folderId) throw new Error("Folder ID is required");

    const files = await fileService.getFilesInFolder(
      userId,
      folderId as string,
    );

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Files fetched successfully",
      data: files,
    });
  },
);

export const renameFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { fileId } = req.params;
  const { newName } = req.body;

  if (!userId) throw new Error("Unauthorized");
  if (!fileId) throw new Error("File ID is required");
  if (!newName) throw new Error("New file name is required");

  const updatedFile = await fileService.renameFile(
    userId,
    fileId as string,
    newName,
  );

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "File renamed successfully",
    data: updatedFile,
  });
});

export const downloadFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { fileId } = req.params;

  if (!userId) throw new Error("Unauthorized");
  if (!fileId) throw new Error("File ID is required");

  const file = await fileService.downloadFile(userId, fileId as string);

  res.download(file.path, file.name);
});

export const previewFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { fileId } = req.params;

  if (!userId) throw new Error("Unauthorized");
  if (!fileId) throw new Error("File ID is required");

  const file = await fileService.previewFile(userId, fileId as string);

  res.sendFile(file.path, { root: process.cwd() });
});

export const fileController = {
  uploadFile,
  getFilesInFolder,
  renameFile,
  downloadFile,
  previewFile,
};
