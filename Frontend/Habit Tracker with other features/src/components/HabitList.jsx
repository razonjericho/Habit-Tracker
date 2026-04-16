import React from 'react'
import HabitItem from './HabitItem';

function HabitList(props){
    return (
        <ul> 
            {props.habits.map(habit => (
            <HabitItem key={habit.id} id={habit.id} text={habit.habit} onDone={props.onDone} showDoneOnly={props.showDoneOnly} />  
             ))}
        </ul>
    )
}

export default HabitList;