import React from 'react';
import HabitList from '../components/HabitList/HabitList';

function HomePage(props){
    const mode = "home";

    return (
        <div>
            <h1>To Do</h1>
            <HabitList 
                habits={props.habits}
                onDone={props.onDone}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                mode={mode}  
            />
            <h2>Done</h2>
            <HabitList 
                habits={props.habits}
                onDone={props.onDone}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                mode={mode}
            />
        </div> 
    )
}

export default HomePage;