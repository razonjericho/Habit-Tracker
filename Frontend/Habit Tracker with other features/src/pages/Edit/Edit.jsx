import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import HabitList from '../../components/HabitList/HabitList';
import HabitInput from '../../components/HabitInput/HabitInput';
import { HabitContext } from '../../HabitContext';

function EditPage() {
    const context = useContext(HabitContext);
    const {habits, addHabit, editHabit, archiveHabit, restoreHabit, deleteHabit} = context;
    const [archivedHabit, setArchivedHabits] = useState([]);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
    async function fetchArchivedHabits() {
        const response = await axios.get(`${API_URL}/habits/edit/archive`);

        setArchivedHabits(response.data);
        }

        fetchArchivedHabits();
    }, []);

    return (
        <div>
            <h2>Edit Habits</h2>
            <HabitList habits={habits} onEdit={editHabit} onArchive={archiveHabit} />
            <HabitInput onAdd={addHabit} />
            <h2>Archived Habits</h2>
            <HabitList habits={archivedHabit} onRestore={restoreHabit} onDelete={deleteHabit} />
        </div>
    )
    
}

export default EditPage;