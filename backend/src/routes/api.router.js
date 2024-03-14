import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import UserController from "../controller/user.controller.js";
import { Role } from "../utils/common.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.patch("/update", authMiddleware, UserController.update);
router.delete("/:id",authMiddleware,RoleMiddleware(Role.ADMIN),UserController.delete)
router.get("/user", authMiddleware,UserController.getUser);
router.get("/users", authMiddleware, RoleMiddleware(Role.ADMIN), UserController.getAllUser);


export default router;