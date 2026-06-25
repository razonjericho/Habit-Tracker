import express from "express";
import { getHabits, createHabit, completeHabit, editHabit, archiveHabit, restoreHabit, deleteHabit, getHabitStreak, getHabitLongestStreak, getHabitHeatMap, getDayDetails } from "../controllers/habitController.js";
import verifyToken from "../middleware/authMiddleWare.js";

const router = express.Router();

router.get("/", verifyToken, getHabits);
router.post("/", verifyToken, createHabit);
router.post("/:id/completed", verifyToken, completeHabit);
router.patch("/edit/rename/:id", verifyToken, editHabit);
router.patch("/edit/archive/:id", verifyToken, archiveHabit);
router.patch("/edit/archive/restore/:id", verifyToken, restoreHabit);
router.delete("/edit/archive/delete/:id", verifyToken, deleteHabit);
router.get("/progress/:id", verifyToken, getHabitStreak);
router.get("/progress/:id/details", verifyToken, getHabitLongestStreak);
router.get("/progress", verifyToken, getHabitHeatMap);
router.get("/progress/day/:date", verifyToken, getDayDetails);

export default router;