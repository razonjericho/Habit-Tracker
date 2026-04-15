import React from 'react';
import HabitList from '../components/HabitList';

function HomePage(props){
    return (
        <HabitList habits={props.habits} onDone={props.onDone} showDoneOnly={true}  />
    )
}

export default HomePage;