import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
  });
};

const getUserDetails = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      folders: true,
      files: true,
      subscriptions: {
        select: {
          id: true,
          packageId: true,
          startDate: true,
          endDate: true,
          isActive: true,
          package: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

const getCurrentUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};

export const authServices = {
  getAllUsers,
  getUserDetails,
  getCurrentUser,
};
