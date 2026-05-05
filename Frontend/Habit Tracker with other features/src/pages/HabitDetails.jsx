import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { HabitContext } from '../HabitContext';

function HabitDetailsPage(){
    const params = useParams();
    const id = Number(params.id);
    const context = useContext(HabitContext);
    const { habits } = context;

    const selectedHabit = habits.find(habit => habit.id === id);

    if (!selectedHabit) {
        return <p>Habit not found</p>;
    }

    console.log(selectedHabit);
    return (
        <div>
            <h1>Habit Details</h1>
            <p>Habit: {selectedHabit.habit}</p>
        </div>
    )
}

export default HabitDetailsPage;