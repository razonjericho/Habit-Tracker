import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

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
    try {
        const result = await db.query("SELECT * FROM habits");
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

app.patch("/habits/:id", async (req, res) => {
    const editHabit = req.body.editHabit;
    const id = req.params.id;
    try {
        const result = await db.query("UPDATE habits SET habit = ($1) WHERE id = ($2) RETURNING *;", [editHabit, id])
        const updatedHabit = result.rows[0];
        res.json({ message: "Habit updated successfully", updatedHabit: updatedHabit });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/habits/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM habits WHERE id = $1", [id]);
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
