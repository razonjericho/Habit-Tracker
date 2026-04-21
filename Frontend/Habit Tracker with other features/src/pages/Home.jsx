import React from 'react';
import HabitList from '../components/HabitList/HabitList';

function HomePage(props){
    const todoHabits = props.habits.filter(habit => habit.iscompleted === false);
    const doneHabits = props.habits.filter(habit => habit.iscompleted === true);

    return (
        <div>
            <h2>To Do</h2>
            <HabitList 
                habits={todoHabits}
                onDone={props.onDone}
                mode="todo"  
            />
            <h2>Done</h2>
            <HabitList 
                habits={doneHabits}
                onDone={props.onDone}
                mode="done"
            />
        </div> 
    )
}

export default HomePage;