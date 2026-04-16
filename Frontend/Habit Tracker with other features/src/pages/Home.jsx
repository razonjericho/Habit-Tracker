import React from 'react';
import HabitList from '../components/HabitList';

function HomePage(props){
    return (
        <div>
        <HabitList text={props.text} onDone={props.onDone} showDoneOnly={true}  />
        </div>
        
    )
}

export default HomePage;