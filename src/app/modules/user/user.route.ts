import {  Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validationl";
import { validateRequest } from "../../middlewares/validateRequest";



const router = Router();

// ✅ Register route with validation + controller
router.post("/register", validateRequest(createUserZodSchema), userController.createUser);

// ✅ Get all users
router.get("/all-users", userController.getAllUsers);

export const UserRoutes = router;
