import { Router } from "express";
import { userSubscriptionController } from "./userSubscription.controller";
import { Role } from "../../../generated/prisma/enums";
import { protect } from "../../middleware/auth";

const router = Router();

router.get(
  "/active", protect(Role.USER),
  userSubscriptionController.getActivePackage
);

router.get(
  "/history", protect(Role.USER),
  userSubscriptionController.getSubscriptionHistory
);

router.post(
  "/select", protect(Role.USER),
  userSubscriptionController.selectPackage
);

export const userSubscriptionRoutes = router;