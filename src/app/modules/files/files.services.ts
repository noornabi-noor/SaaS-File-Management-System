import { FileType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import fs from "fs";

const getActivePackage = async (userId: string) => {
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      isActive: true,
    },
    include: {
      package: true,
    },
  });

  if (!subscription) {
    throw new Error("No active subscription package found");
  }

  return subscription.package;
};

const uploadFile = async (
  userId: string,
  folderId: string,
  file: Express.Multer.File,
) => {
  const userPackage = await getActivePackage(userId);

  let extension: FileType;
  switch (file.mimetype) {
    case "application/pdf":
      extension = FileType.PDF;
      break;
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "image/gif":
      extension = FileType.IMAGE;
      break;
    case "video/mp4":
    case "video/mov":
      extension = FileType.VIDEO;
      break;
    case "audio/mpeg":
    case "audio/wav":
      extension = FileType.AUDIO;
      break;
    default:
      throw new Error("File type not supported");
  }

  if (!userPackage.allowedFileTypes.includes(extension)) {
    throw new Error("File type not allowed in your subscription package");
  }

  const fileSizeMB = file.size / (1024 * 1024);

  if (fileSizeMB > userPackage.maxFileSizeMB) {
    throw new Error("File size exceeds your subscription limit");
  }

  const totalFiles = await prisma.file.count({ where: { userId } });
  if (totalFiles >= userPackage.totalFileLimit) {
    throw new Error("Total file limit exceeded");
  }

  const folderFiles = await prisma.file.count({ where: { folderId } });
  if (folderFiles >= userPackage.filesPerFolder) {
    throw new Error("Files per folder limit exceeded");
  }

  const relativePath = `src/uploads/${file.filename}`;

  return prisma.file.create({
    data: {
      name: file.originalname,
      type: extension,
      sizeMB: fileSizeMB,
      path: relativePath,
      userId,
      folderId,
    },
  });
};

const getFilesInFolder = async (userId: string, folderId: string) => {
  return prisma.file.findMany({
    where: { userId, folderId },
    orderBy: { createdAt: "desc" },
  });
};

const renameFile = async (userId: string, fileId: string, newName: string) => {
  if (!newName || newName.trim() === "") {
    throw new Error("New file name is required");
  }

  const existingFile = await prisma.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  if (!existingFile) {
    throw new Error("File not found or unauthorized");
  }

  return prisma.file.update({
    where: { id: fileId },
    data: { name: newName },
  });
};

const downloadFile = async (userId: string, fileId: string) => {
  const file = await prisma.file.findFirst({
    where: { id: fileId, userId },
  });

  if (!file) {
    throw new Error("File not found");
  }

  if (!fs.existsSync(file.path)) {
    throw new Error("Physical file missing on server");
  }

  return file;
};

const previewFile = async (userId: string, fileId: string) => {
  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  if (!file) {
    throw new Error("File not found or unauthorized");
  }

  if (!fs.existsSync(file.path)) {
    throw new Error("File does not exist on server");
  }

  return file;
};

export const fileService = {
  uploadFile,
  getFilesInFolder,
  renameFile,
  downloadFile,
  previewFile,
};
