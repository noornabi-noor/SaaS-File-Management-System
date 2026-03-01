import { SubscriptionPackage } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import {
  CreatePackagePayload,
  UpdatePackagePayload,
} from "./subscription.type";

const createPackage = async (payload: CreatePackagePayload) => {
  const existing = await prisma.subscriptionPackage.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new Error("Package already exists");
  }

  return prisma.subscriptionPackage.create({
    data: payload,
  });
};

const getAllPackage = async (): Promise<SubscriptionPackage[]> => {
  return await prisma.subscriptionPackage.findMany();
};

const getSinglePackage = async (id: string) => {
  const result = await prisma.subscriptionPackage.findUnique({
    where: { id },
  });

  if (!result) {
    throw new Error("Package not found");
  }

  return result;
};

const updatePackage = async (
  id: string,
  payload: Partial<UpdatePackagePayload>,
) => {
  return prisma.subscriptionPackage.update({
    where: { id },
    data: payload,
  });
};

const deletePackage = async (id: string) => {
  return prisma.subscriptionPackage.delete({
    where: { id },
  });
};

export const subscriptionService = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
