import { prisma } from "../../lib/prisma";


  const createPackage = async(data: any) => {
    return prisma.subscriptionPackage.create({ data });
  }


export const subscriptionService = {
    createPackage,
}