import db from "../db.js"
import calculateStreak from "../services/habitService.js";

const getHabits = async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    try {
        const result = await db.query(
            `
            SELECT habits.id AS id, habits.habit AS habit, 
            COALESCE(completions.completed, false) AS \"isCompleted\" 
            FROM habits 
            LEFT JOIN completions 
            ON habits.id = completions.habit_id 
            AND completions.date = ($1) 
            WHERE active = true
            `, 
            [date]
        );
        const habits = result.rows;
        res.json(habits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch habits" });
    }
}

const getHabitStreak = async (req, res) => {
    const habit_id = req.params.id
    try {
        const result = await db.query(
            `
            SELECT completions.date
            FROM completions
            WHERE completions.habit_id = ($1)
            AND completions.completed = true
            ORDER BY completions.date DESC;
            `,
            [habit_id]
        );

        const dates = result.rows.map(row => row.date);

        const streak = calculateStreak(dates);

        res.json({habit_id, streak});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch habit streak"})
    }
}

const createHabit = async (req, res) => {
    const addHabit = req.body.addHabit;
    try {
        const result = await db.query(`INSERT INTO habits (habit) VALUES ($1) RETURNING *;`, [addHabit]);
        const newHabit = result.rows[0];
        res.json(newHabit)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const completeHabit = async (req, res) => {
    const habit_id = req.params.id;
    const date = new Date().toISOString().split("T")[0];

    try {
        const result = await db.query(
        `
        INSERT INTO completions (habit_id, date, completed)
        VALUES ($1, $2, true)
        ON CONFLICT (habit_id, date)
        DO UPDATE SET completed = NOT completions.completed
        RETURNING habit_id AS id, date, completed AS \"isCompleted\"
        `,
        [habit_id, date]
        );
        const habitToday = result.rows[0]
        res.json(habitToday);
        console.log("ISO date:", date);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to toggle completion" });
    }
}

const editHabit = async (req, res) => {
    const updatedText = req.body.editHabit;
    const id = req.params.id;
    try {
        const result = await db.query(`UPDATE habits SET habit = ($1) WHERE id = ($2) RETURNING *;`, [updatedText, id])
        const updatedHabit = result.rows[0];
        res.json(updatedHabit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update habit" });
    }
}

const deleteHabit = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`UPDATE habits SET active = false WHERE id = $1`, [id]);
        const rowCount = result.rowCount;
        if (rowCount === 0) {
            res.status(404).json({ error: "Habit not found" })
        } else if (rowCount !== 0) {
            res.json({ message: "Habit deleted successfully", id: id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete a habit" });
    }
}

export { getHabits, getHabitStreak, createHabit, completeHabit, editHabit, deleteHabit };