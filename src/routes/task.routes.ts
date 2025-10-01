import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getTasks);
router.get("/:id", authenticateToken, getTaskById);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

export default router;