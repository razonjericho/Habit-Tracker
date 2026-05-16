import express from "express";
import { getHabits, getArchivedHabits, getHabitStreak, getHabitLongestStreak, createHabit, completeHabit, editHabit, archiveHabit, restoreHabit } from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.get("/edit/archive", getArchivedHabits);
router.get("/progress/:id", getHabitStreak);
router.get("/progress/:id/details", getHabitLongestStreak);
router.post("/", createHabit);
router.post("/:id/completed", completeHabit);
router.patch("/edit/rename/:id", editHabit);
router.patch("/edit/archive/:id", archiveHabit);
router.patch("/edit/archive/:id", restoreHabit);

export default router;