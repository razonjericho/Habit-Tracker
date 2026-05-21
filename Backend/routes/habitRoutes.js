import express from "express";
import { getHabits, createHabit, completeHabit, editHabit, archiveHabit, restoreHabit, deleteHabit, getHabitStreak, getHabitLongestStreak, getTotalCompletedHabits } from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.post("/:id/completed", completeHabit);
router.patch("/edit/rename/:id", editHabit);
router.patch("/edit/archive/:id", archiveHabit);
router.patch("/edit/archive/restore/:id", restoreHabit);
router.delete("/edit/archive/delete/:id", deleteHabit);
router.get("/progress/:id", getHabitStreak);
router.get("/progress/:id/details", getHabitLongestStreak);
router.get("/progress", getTotalCompletedHabits);

export default router;