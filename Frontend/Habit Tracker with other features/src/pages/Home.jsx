import React from 'react';
import HabitList from '../components/HabitList';

function HomePage(props){
    return (
        <div>
            <h1>My Habits</h1>
        <HabitList onDone={props.onDone} showDoneOnly={true} habits={props.habits}  />
        </div> 
    )
}

export default HomePage;