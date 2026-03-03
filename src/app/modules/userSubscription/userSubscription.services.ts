import { prisma } from "../../lib/prisma";

const selectPackage = async (userId: string, packageId: string) => {
  await prisma.userSubscription.updateMany({
    where: { userId, isActive: true },
    data: {
      isActive: false,
      endDate: new Date(),
    },
  });

  return prisma.userSubscription.create({
    data: {
      userId,
      packageId,
      isActive: true,
    },
  });
};

const getActivePackage = async (userId: string) => {
  const subscription = await prisma.userSubscription.findFirst({
    where: { userId, isActive: true },
    include: { package: true },
  });

  return subscription?.package || null;
};

const getSubscriptionHistory = async (userId: string) => {
  return prisma.userSubscription.findMany({
    where: { userId },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      isActive: true,
      package: {
        select: {
          id: true,
          name: true,
          maxFolders: true,
          maxNestingLevel: true,
        },
      },
    },
    orderBy: {
      startDate: "desc",
    },
  });
};

export const userSubscriptionService = {
  selectPackage,
  getActivePackage,
  getSubscriptionHistory
};