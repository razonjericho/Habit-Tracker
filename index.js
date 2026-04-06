import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "habit_tracker",
    password: "REMOVED",
    port: 5432,
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

        res.json(habits);

    } catch (err) {
        console.log(err)
    }
});

app.post("/habits", async (req, res) => {
    const newHabit = req.body.newHabit;
    try {
        await db.query("INSERT INTO habits (habit) VALUES ($1)", [newHabit]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.patch("/habits/:id", async (req, res) => {
    const editHabit = req.body.updatedHabit;
    const id = req.body.updatedHabitId;
    try {
        await db.query("UPDATE habits SET habit = ($1) WHERE id = ($2)", [editHabit, id])
    } catch (err) {
        console.log(err);
    }
});

app.delete("/habits/:id", async (req, res) => {
    const id = req.body.deletedHabitId

    try {
        await db.query("DELETE FROM habits WHERE id = $1", [id]);
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
