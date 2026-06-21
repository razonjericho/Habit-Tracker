import db from "../db.js"
import { calculateStreak, calculateLongestStreak } from "../services/habitService.js"

const getHabits = async (req, res) => {
    const date = new Date().toLocaleDateString("en-CA");
    try {
        const result = await db.query(
            `
            SELECT habits.id AS id, habits.habit AS habit, habits.active AS active, habits.created_at AS created_at, habits.archived_at AS archived_at, 
            COALESCE(completions.completed, false) AS \"isCompleted\" 
            FROM habits 
            LEFT JOIN completions 
            ON habits.id = completions.habit_id 
            AND completions.date = ($1) 
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

const createHabit = async (req, res) => {
    const addHabit = req.body.addHabit;
    try {
        const result = await db.query(
            `
            WITH added AS (
                INSERT INTO habits (habit, created_at) 
                VALUES ($1, CURRENT_TIMESTAMP) 
                RETURNING id, habit, active, created_at, archived_at
            ),
            event_added AS (
                INSERT INTO habit_events (habit_id, event_type, occurred_at)
                SELECT
                    added.id,
                    'created',
                    CURRENT_TIMESTAMP
                FROM added
            )
            SELECT
                added.id AS id,
                added.habit AS habit,
                added.active AS active,
                added.created_at AS created_at,
                added.archived_at AS archived_at,
                COALESCE(completions.completed, false) AS \"isCompleted\"
            FROM added
            LEFT JOIN completions
                ON added.id = completions.habit_id
            `, 
            [addHabit]);
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
            WITH upsert AS (
                INSERT INTO completions (habit_id, date, completed)
                VALUES ($1, $2, true)
                ON CONFLICT (habit_id, date)
                DO UPDATE SET completed = NOT completions.completed
                RETURNING habit_id, date, completed
            )
            SELECT 
                habits.id AS id,
                habits.habit AS habit,
                habits.active AS active,
                COALESCE(upsert.completed, false) AS "isCompleted"
            FROM habits
            LEFT JOIN upsert
                ON habits.id = upsert.habit_id
            WHERE habits.id = ($1)
        `,
        [habit_id, date]
        );
        const habitToday = result.rows[0]
        res.json(habitToday);
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
            `
            WITH updated AS (
                UPDATE habits
                SET habit = ($1)
                WHERE id = ($2)
                RETURNING id, habit, active, created_at, archived_at
            )
            SELECT
                updated.id,
                updated.habit,
                updated.active,
                updated.created_at,
                updated.archived_at,
                COALESCE(completions.completed, false) AS \"isCompleted\"
            FROM updated
            LEFT JOIN completions
                ON updated.id = completions.habit_id
                AND completions.date = ($3)
            `, 
            [updatedText, id, date])
        const updatedHabit = result.rows[0];
        res.json(updatedHabit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update habit" });
    }
}

const archiveHabit = async (req, res) => {
    const id = req.params.id;
    const date = new Date().toLocaleDateString("en-CA");
    try {
        const result = await db.query(
            `
            WITH archived AS (
                UPDATE habits 
                SET 
                    active = false,
                    archived_at = CURRENT_TIMESTAMP 
                WHERE id = ($1) 
                RETURNING id, habit, active, created_at, archived_at
            ),
            event_archived AS (
                INSERT INTO habit_events (habit_id, event_type, occurred_at)
                SELECT
                    archived.id,
                    'archived',
                    CURRENT_TIMESTAMP
                FROM archived
            ),
            incompleted AS (
                UPDATE completions
                SET
                    completed = false
                WHERE habit_id = ($1) 
                AND date = ($2)
            )
            SELECT
                archived.id,
                archived.habit,
                archived.active,
                archived.created_at,
                archived.archived_at,
                COALESCE(completions.completed, false) AS \"isCompleted\"
            FROM archived
            LEFT JOIN completions 
                ON archived.id = completions.habit_id
                AND completions.date = ($2)
            `, 
            [id, date]);
        const archivedHabit = result.rows[0];

        if (!archivedHabit) {
            return res.status(404).json({ error: "Habit is not found" });
        }

        res.json(archivedHabit);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to archive a habit" });
    }
}

const restoreHabit = async (req, res) => {
    const date = new Date().toLocaleDateString("en-CA");
    const id = req.params.id;
    try {
        const result = await db.query(
            `
            WITH restored AS (
                UPDATE habits 
                SET active = true
                WHERE id = ($1) 
                RETURNING id, habit, active, created_at, archived_at
            ),
            event_restored AS (
                INSERT INTO habit_events (habit_id, event_type, occurred_at)
                SELECT
                    restored.id,
                    'restored',
                    CURRENT_TIMESTAMP
                FROM restored
            )
            SELECT
                restored.id,
                restored.habit,
                restored.active,
                restored.created_at,
                restored.archived_at,
                COALESCE(completions.completed, false) AS \"isCompleted\"
            FROM restored
            LEFT JOIN completions 
                ON restored.id = completions.habit_id
                AND completions.date = ($2)
            `, 
            [id, date]);
        const restoredHabit = result.rows[0];

        if (!restoredHabit) {
            return res.status(404).json({ error: "Habit is not found" });
        }

        res.json(restoredHabit);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to restore a habit" })
    }
}

const deleteHabit = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(
            `DELETE FROM completions WHERE habit_id = ($1)`,
            [id]
        );

        await db.query(
            `DELETE FROM habit_events WHERE habit_id = ($1)`,
            [id]
        );

        const result = await db.query(`DELETE FROM habits WHERE id = ($1)`, [id]);
        const rowCount = result.rowCount;
        if (rowCount === 0) {
            res.status(404).json({ error: "Habit not found" })
        } else if (rowCount !== 0) {
            res.json({ message: "Habit permanently deleted", id: id })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete a habit" })
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

const getHabitHeatMap = async (req, res) => {
    try {
        const result = await db.query(
            `
            SELECT 
                completions.date, 
                COUNT(*) AS completed,
                (
                    SELECT COUNT (*)
                        FROM (
                            SELECT DISTINCT ON (habit_id)
                                habit_id,
                                event_type,
                                occurred_at,

                                CASE
                                    WHEN event_type IN ('created', 'restored')
                                        THEN true
                                    ELSE false
                                END AS active
                            FROM habit_events 
                            WHERE occurred_at < (completions.date + 1)
                            ORDER BY habit_id, occurred_at DESC
                        ) latest_events
                        WHERE active = true
                ) AS total_habits

            FROM completions
            WHERE completions.completed = true
            GROUP BY completions.date
            `
        )
        
        const heatMap = {};

        result.rows.forEach(row => {
            const date = new Date(row.date).toLocaleDateString("en-CA");
            heatMap[date] = {
            completed: Number(row.completed),
            totalHabits: Number(row.total_habits),
            intensity:
                row.total_habits === 0
                    ? 0 
                    : Number(row.completed) / Number(row.total_habits)
        };
        });

        res.json(heatMap);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to load total number of completed habits"});
    }
}

const getDayDetails = async (req, res) => {
    const date = req.params.date;

    try {
        const result = await db.query(
            `
            SELECT habits.id AS id, habits.habit AS habit, habits.active AS active,
            COALESCE (completions.completed, false) AS \"isCompleted\"
            FROM habits
            JOIN (
                SELECT DISTINCT ON (habit_id)
                    habit_id,
                    event_type
                FROM habit_events
                WHERE occurred_at::date <= ($1)
                ORDER BY habit_id, occurred_at DESC
            ) AS latest_event
            ON habits.id = latest_event.habit_id
            LEFT JOIN completions
            ON habits.id = completions.habit_id
            AND completions.date = ($1)
            WHERE latest_event.event_type IN ('created', 'restored')
            `, 
            [date]
        );

        const dayDetails = result.rows;

        res.json({date, dayDetails});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to load the details of this date"});
    }
}

export { getHabits, createHabit, completeHabit, editHabit, archiveHabit, restoreHabit, deleteHabit, getHabitStreak, getHabitLongestStreak, getHabitHeatMap, getDayDetails };   