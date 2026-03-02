import { Router } from "express";
import { protect } from "../../middleware/auth";
import { upload } from "./file.upload";
import { fileController } from "./files.controller";

const router = Router();

router.use(protect());

router.get("/folder/:folderId", fileController.getFilesInFolder);
router.get("/download/:fileId", fileController.downloadFile);
router.get("/preview/:fileId", fileController.previewFile);
router.post("/upload/:folderId", upload.single("file"), fileController.uploadFile);
router.patch("/rename/:fileId", fileController.renameFile);

export const fileRoutes = router;