import express from "express";
import { registerUser, logUser } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logUser);

export default authRouter;