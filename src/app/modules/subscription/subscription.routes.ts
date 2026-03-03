import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { protect } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", protect(), subscriptionController.getAllPackage);
router.get("/:id", protect(), subscriptionController.getSinglePackage);
router.post("/", protect(Role.ADMIN), subscriptionController.createPackage);
router.patch("/:id", protect(Role.ADMIN), subscriptionController.updatePackage);
router.delete("/:id", protect(Role.ADMIN), subscriptionController.deletePackage);

export const subscriptionRoutes = router;
