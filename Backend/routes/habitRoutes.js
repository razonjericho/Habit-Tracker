import express from "express";
import db from "../db.js"
import { getHabits, createHabit, completeHabit, editHabit, deleteHabit } from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.post("/:id/completed", completeHabit);
router.patch("/:id", editHabit);
router.delete("/:id", deleteHabit);

export default router;