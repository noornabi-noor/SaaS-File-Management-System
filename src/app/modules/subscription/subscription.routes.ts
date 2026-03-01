import { Router } from "express";
import { subscriptionController } from "./subscription.controller";

const router = Router();

router.get("/", subscriptionController.getAllPackage);
router.get("/:id", subscriptionController.getSinglePackage);
router.post("/", subscriptionController.createPackage);
router.patch("/:id", subscriptionController.updatePackage);
router.delete("/:id", subscriptionController.updatePackage);

export const subscriptionRoutes = router;
