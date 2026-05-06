import express from "express";
import { getHabits, createHabit, completeHabit, editHabit, deleteHabit, getHabitStreak, getHabitLongestStreak } from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.get("/progress/:id", getHabitStreak);
router.get("/progress/:id/details", getHabitLongestStreak);
router.post("/", createHabit);
router.post("/:id/completed", completeHabit);
router.patch("/:id", editHabit);
router.delete("/:id", deleteHabit);

export default router;