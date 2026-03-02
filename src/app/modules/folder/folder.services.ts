import { prisma } from "../../lib/prisma";
import { CreateFolderPayload, UpdateFolderPayload } from "./folder.interface";

const getActiveSubscription = async (userId: string) => {
  const subscription = await prisma.userSubscription.findFirst({
    where: { userId, isActive: true },
    include: { package: true },
  });

  if (!subscription) {
    throw new Error("No active subscription found");
  }

  return subscription.package;
};

const getFolderLevel = async (folderId: string): Promise<number> => {
  let level = 0;
  let current = await prisma.folder.findUnique({
    where: { id: folderId },
  });

  while (current?.parentId) {
    level++;
    current = await prisma.folder.findUnique({
      where: { id: current.parentId },
    });
  }

  return level + 1;
};

const createFolder = async (payload: CreateFolderPayload) => {
  const { userId, name, parentId } = payload;

  const userPackage = await getActiveSubscription(userId);

  const totalFolders = await prisma.folder.count({
    where: { userId },
  });

  if (totalFolders >= userPackage.maxFolders) {
    throw new Error("Folder limit exceeded for your subscription");
  }

  if (parentId) {
    const parentFolder = await prisma.folder.findFirst({
      where: { id: parentId, userId },
    });

    if (!parentFolder) {
      throw new Error("Parent folder not found");
    }

    const level = await getFolderLevel(parentId);

    if (level >= userPackage.maxNestingLevel) {
      throw new Error("Max nesting level exceeded");
    }
  }

  return prisma.folder.create({
    data: {
      name,
      userId,
      parentId: parentId || null,
    },
  });
};

const getUserFolders = async (userId: string) => {
  return prisma.folder.findMany({
    where: { userId, parentId: null }, 
    orderBy: { createdAt: "desc" },
    include: {
      files: true, 
      children: {
        include: {
          files: true, 
          children: {
            include: {
              files: true, 
              children: {
                include: {
                  files: true, 
                },
              },
            },
          },
        },
      },
    },
  });
};

const getSingleFolder = async (userId: string, folderId: string) => {
  if (!folderId) {
    throw new Error("Folder ID is required");
  }

  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId,
    },
    include: {
      children: {
        include: {
          files: true,
          children: {
            include: {
              files: true,
              children: {
                include: {
                  files: true,
                },
              },
            },
          },
        },
      },
      files: true,
      parent: true,
    },
  });

  if (!folder) {
    throw new Error("Folder not found or unauthorized");
  }

  return folder;
};

const updateFolder = async (payload: UpdateFolderPayload) => {
  const { userId, folderId, name } = payload;

  if (!name.trim()) {
    throw new Error("Folder name cannot be empty");
  }

  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId,
    },
  });

  if (!folder) {
    throw new Error("Folder not found or unauthorized");
  }

  return prisma.folder.update({
    where: { id: folderId },
    data: { name },
  });
};

const deleteFolder = async (userId: string, folderId: string) => {
  const folder = await prisma.folder.findFirst({
    where: { id: folderId, userId },
  });

  if (!folder) {
    throw new Error("Folder not found");
  }

  return prisma.folder.delete({
    where: { id: folderId },
  });
};

export const folderService = {
  createFolder,
  getUserFolders,
  getSingleFolder,
  updateFolder,
  deleteFolder,
};
