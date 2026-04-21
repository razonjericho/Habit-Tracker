import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

let habits = [
    {id: 1, habit: "Wake up"},
    {id: 2, habit: "Pray"},
];

app.get("/habits", async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    try {
        const result = await db.query("SELECT habits.id AS id, habits.habit AS habit, COALESCE(completions.completed, false) AS \"isCompleted\" FROM habits LEFT JOIN completions ON habits.id = completions.habit_id AND completions.date = ($1) WHERE active = true", [date]);
        habits = result.rows;
        res.json(habits);

    } catch (err) {
        console.log(err)
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
        const result = await db.query("SELECT * FROM completions WHERE habit_id = ($1) AND date = ($2)", [habit_id, date]);
        const data = result.rows.length;
        if (data === 0) {
            const newResult = await db.query("INSERT INTO completions (habit_id, date, completed) VALUES ($1, $2, $3) RETURNING habit_id AS id, date, completed AS \"isCompleted\"", [habit_id, date, true]);
            const habitToday = newResult.rows[0];
            res.json(habitToday);
        } else {
            const completed = result.rows[0].completed
         
            const updateResult = await db.query("UPDATE completions SET completed = ($1) WHERE habit_id = ($2) AND date = ($3) RETURNING completed AS \"isCompleted\", habit_id AS id, date", [!completed, habit_id, date]);
            const updateHabitToday = updateResult.rows[0];
            res.json(updateHabitToday)
        }
    } catch (err) {
        console.error(err)
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
