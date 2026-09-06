import express from "express";
import { registerUser, logUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logUser);

export default authRouter;