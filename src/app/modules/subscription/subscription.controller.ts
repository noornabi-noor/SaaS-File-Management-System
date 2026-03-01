import { Request, Response } from "express";
import { subscriptionService } from "./subscription.service";

const createPackage = async (req: Request, res: Response) => {
  const data = await subscriptionService.createPackage(req.body);
  res.json(data);
};

export const subscriptionController = {
    createPackage,
    
}