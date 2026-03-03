import { Router } from "express";
import { authController } from "./auth.controller";
import { protect } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", protect(Role.ADMIN), authController.getAllUsers);
router.get("/me", protect(), authController.getCurrentUser);
router.get("/:id", protect(Role.ADMIN), authController.getUserDetails);

export const authRoutes = router;