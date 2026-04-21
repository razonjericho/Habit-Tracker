import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db.js"

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/habits", async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    try {
        const result = await db.query("SELECT habits.id AS id, habits.habit AS habit, COALESCE(completions.completed, false) AS \"isCompleted\" FROM habits LEFT JOIN completions ON habits.id = completions.habit_id AND completions.date = ($1) WHERE active = true", [date]);
        let habits = result.rows;
        res.json(habits);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch habits" });
    }
});

app.post("/habits", async (req, res) => {
    const addHabit = req.body.addHabit;
    try {
        const result = await db.query("INSERT INTO habits (habit) VALUES ($1) RETURNING *;", [addHabit]);
        const newHabit = result.rows[0];
        res.json(newHabit)
    } catch (err) {
        console.log(err);
    }
});

app.post("/habits/:id/completed", async (req, res) => {
  const habit_id = req.params.id;
  const date = new Date().toISOString().split("T")[0];

  try {
    const result = await db.query(
      `
      INSERT INTO completions (habit_id, date, completed)
      VALUES ($1, $2, true)
      ON CONFLICT (habit_id, date)
      DO UPDATE SET completed = NOT completions.completed
      RETURNING habit_id AS id, date, completed AS "isCompleted";
      `,
      [habit_id, date]
    );
    const habitToday = result.rows[0]
    res.json(habitToday);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle completion" });
  }
});

app.patch("/habits/:id", async (req, res) => {
    const editHabit = req.body.editHabit;
    const id = req.params.id;
    try {
        const result = await db.query("UPDATE habits SET habit = ($1) WHERE id = ($2) RETURNING *;", [editHabit, id])
        const updatedHabit = result.rows[0];
        res.json({ message: "Habit updated successfully", updateHabit: updatedHabit });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/habits/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("UPDATE habits SET active = false WHERE id = $1", [id]);
        const rowCount = result.rowCount;
        if (rowCount === 0) {
            res.status(404).json({ error: "Habit not found" })
        } else if (rowCount !== 0) {
            res.json({ message: "Habit deleted successfully", id: id });
        }
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
