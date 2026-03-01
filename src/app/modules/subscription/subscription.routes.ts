import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
// import { SubscriptionController } from "./subscription.controller";
// import { authMiddleware } from "../../middlewares/auth.middleware";
// import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = Router();
// const controller = new SubscriptionController();

// Admin CRUD
router.post("/", subscriptionController.createPackage);
// router.get("/", authMiddleware, controller.getAllPackages);
// router.put("/:id", authMiddleware, adminMiddleware, controller.updatePackage);
// router.delete("/:id", authMiddleware, adminMiddleware, controller.deletePackage);

// // User select package
// router.post("/select/:packageId", authMiddleware, controller.selectPackage);

export const subscriptionRoutes = router;