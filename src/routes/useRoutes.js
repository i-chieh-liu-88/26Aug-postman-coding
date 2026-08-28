//從 Express 匯入 Router，這是用來建立「小型、可插拔」路由表的工具。
import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  patchUser,
  updateUser,
} from "../controllers/userController.js";

//建立一個路由器實例，之後會掛載到主 app 上。
const router = Router();

// 我們把每個路徑對應到 controller 裡的函式，完全看不到邏輯細節。
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
