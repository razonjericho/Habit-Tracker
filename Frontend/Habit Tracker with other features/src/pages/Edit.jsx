import React, { useContext } from 'react'
import HabitList from '../components/HabitList/HabitList';
import HabitInput from '../components/HabitInput/HabitInput';
import { HabitContext } from '../HabitContext';

function EditPage() {
    const context = useContext(HabitContext);
    const {habits, addHabit, editHabit, deleteHabit} = context;

    return (
        <div>
            <h1>Edit Habits</h1>
            <HabitList habits={habits} onEdit={editHabit} onDelete={deleteHabit} />
            <HabitInput onAdd={addHabit} />
        </div>
    )
    
}

export default EditPage;