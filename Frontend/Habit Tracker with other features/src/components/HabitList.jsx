import React from 'react'
import HabitItem from './HabitItem';

function HabitList(props){
    return (
        <ul> 
            <HabitItem text={props.text} onDone={props.onDone} showDoneOnly={props.showDoneOnly} />   
        </ul>
    )
}

export default HabitList;