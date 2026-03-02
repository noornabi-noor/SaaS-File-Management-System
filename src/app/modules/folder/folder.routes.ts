import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { folderController } from "./folder.controller";
import { protect } from "../../middleware/auth";

const router = Router();

router.get("/:userId", protect(Role.USER), folderController.getUserFolders);
router.get("/:id", protect(Role.USER), folderController.getSingleFolder);
router.post("/", protect(Role.USER), folderController.createFolder);
router.patch("/:id", protect(Role.USER), folderController.updateFolder);
router.delete("/:id", protect(Role.USER), folderController.deleteFolder);

export const folderRoutes = router;