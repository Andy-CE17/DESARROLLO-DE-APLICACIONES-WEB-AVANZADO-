import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);
router.get("/new", userController.showCreateForm);
router.post("/", userController.create);
router.get("/:id/edit", userController.showEditForm);
router.post("/:id/update", userController.update);
router.post("/:id/delete", userController.delete);

export default router;
