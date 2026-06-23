import express from "express";
import { registerUser, logUser, getProfile } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleWare.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logUser);
authRouter.get("/profile", verifyToken, getProfile);

export default authRouter;