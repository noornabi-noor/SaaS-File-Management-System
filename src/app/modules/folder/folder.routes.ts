import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { folderController } from "./folder.controller";
import { protect } from "../../middleware/auth";

const router = Router();

router.use(protect(Role.USER));

router.get("/", folderController.getUserFolders); 
router.get("/:id", folderController.getSingleFolder); 

router.post("/", folderController.createFolder);
router.patch("/:id", folderController.updateFolder);
router.delete("/:id", folderController.deleteFolder);

export const folderRoutes = router;