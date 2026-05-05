import React, { useContext } from 'react';
import HabitList from '../components/HabitList/HabitList';
import { HabitContext } from '../HabitContext';

function HomePage(){
    const context = useContext(HabitContext);
    const {habits, habitDone} = context;
    const todoHabits = habits.filter(habit => habit.isCompleted === false);
    const doneHabits = habits.filter(habit => habit.isCompleted === true);

    return (
        <div>
            <h2>To Do</h2>
            <HabitList 
                habits={todoHabits}
                onDone={habitDone}
            />
            <h2>Done</h2>
            <HabitList 
                habits={doneHabits}
                onDone={habitDone}
            />
        </div> 
    )
}

export default HomePage;