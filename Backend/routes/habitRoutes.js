import express from "express";
import { getHabits, createHabit, completeHabit, editHabit, deleteHabit, getHabitStreak } from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.get("/:id/streak", getHabitStreak);
router.post("/", createHabit);
router.post("/:id/completed", completeHabit);
router.patch("/:id", editHabit);
router.delete("/:id", deleteHabit);

export default router;