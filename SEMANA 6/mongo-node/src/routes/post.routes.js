import express from "express";
import postController from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.showCreateForm);
router.post("/", upload.single("imageFile"), postController.create);
router.get("/:id/edit", postController.showEditForm);
router.post("/:id/update", upload.single("imageFile"), postController.update);
router.post("/:id/delete", postController.delete);

export default router;
