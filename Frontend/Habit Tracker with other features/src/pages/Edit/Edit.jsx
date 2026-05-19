import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import HabitList from '../../components/HabitList/HabitList';
import HabitInput from '../../components/HabitInput/HabitInput';
import { HabitContext } from '../../HabitContext';
import { useNavigate } from 'react-router-dom';

function EditPage() {
    const context = useContext(HabitContext);
    const {habits, addHabit, editHabit, archiveHabit, restoreHabit, deleteHabit} = context;
    const activeHabits = habits.filter(habit => habit.active);
    const archivedHabits = habits.filter(habit => !habit.active);

    const navigate = useNavigate();

    function viewHabitDetails(id) {
        navigate(`/progress/${id}`);
    }

    return (
        <div>
            <h2>Edit Habits</h2>
            <HabitList habits={activeHabits} onEdit={editHabit} onArchive={archiveHabit} />
            <HabitInput onAdd={addHabit} />
            <h2>Archived Habits</h2>
            <HabitList habits={archivedHabits} onViewDetails={viewHabitDetails} onRestore={restoreHabit} onDelete={deleteHabit} />
        </div>
    )
    
}

export default EditPage;