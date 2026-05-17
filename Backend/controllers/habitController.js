import db from "../db.js"
import { calculateStreak, calculateLongestStreak } from "../services/habitService.js"

const getHabits = async (req, res) => {
    const date = new Date().toLocaleDateString("en-CA");
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

const getArchivedHabits = async (req, res) => {
    try {
        const result = await db.query(`SELECT id, habit, active FROM habits WHERE active = false`)
        const archivedHabits = result.rows;
        res.json(archivedHabits);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch archived habits" });
    }
}

const getHabitStreak = async (req, res) => {
    const habit_id = req.params.id;
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
        const dates = result.rows.map(row => 
            new Date(row.date).toLocaleDateString("en-CA")
        );

        const streak = calculateStreak(dates);

        res.json({habit_id, streak});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch habit streak"})
    }
}

const getHabitLongestStreak = async (req, res) => {
    const habit_id = req.params.id;
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
        const dates = result.rows.map(row =>
            new Date(row.date).toLocaleDateString("en-CA")
        );

        const streak = calculateStreak(dates);

        const longestStreak = calculateLongestStreak(dates);
        
        res.json({habit_id, streak, longestStreak, dates});
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch habit streak"})
    }
}

const createHabit = async (req, res) => {
    const addHabit = req.body.addHabit;
    try {
        const result = await db.query(`INSERT INTO habits (habit) VALUES ($1) RETURNING id, habit, false AS \"isCompleted\";`, [addHabit]);
        const newHabit = result.rows[0];
        res.json(newHabit)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const completeHabit = async (req, res) => {
    const habit_id = req.params.id;
    const date = new Date().toLocaleDateString("en-CA");

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
    const date = new Date().toLocaleDateString("en-CA");
    const updatedText = req.body.editHabit;
    const id = req.params.id;
    try {
        const result = await db.query(
            `WITH updated AS (
            UPDATE habits
            SET habit = ($1)
            WHERE id = ($2)
            RETURNING id, habit, active
            )
            SELECT
                updated.id,
                updated.habit,
                COALESCE(completions.completed, false) AS \"isCompleted\"
            FROM updated
            LEFT JOIN completions
                ON updated.id = completions.habit_id
                AND completions.date = ($3)
            `, [updatedText, id, date])
        const updatedHabit = result.rows[0];
        res.json(updatedHabit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update habit" });
    }
}

const archiveHabit = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`UPDATE habits SET active = false WHERE id = $1`, [id]);
        const rowCount = result.rowCount;
        if (rowCount === 0) {
            res.status(404).json({ error: "Habit not found" })
        } else if (rowCount !== 0) {
            res.json({ message: "Habit archived successfully", id: id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to arhive a habit" });
    }
}

const restoreHabit = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`UPDATE habits SET active = true WHERE id = $1`, [id]);
        const rowCount = result.rowCount;
        if (rowCount === 0) {
            res.status(404).json({ error: "Habit not found" })
        } else if (rowCount !== 0) {
            res.json({ message: "Habit restored successfully", id: id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to restore a habit" })
    }
}

const deleteHabit = async (req, res) => {
    const id = req.params.id;
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete a habit" })
    }
}

export { getHabits, getArchivedHabits, getHabitStreak, getHabitLongestStreak, createHabit, completeHabit, editHabit, archiveHabit, restoreHabit };