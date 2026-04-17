import React from 'react'
import HabitItem from '../HabitItem/HabitItem';

function HabitList(props){
    return (
        <ul> 
            {props.habits.map(habit => (
            <HabitItem key={habit.id} id={habit.id} text={habit.habit} onDone={props.onDone} onAdd={props.onAdd} onEdit={props.onEdit} onDelete={props.onDelete} showDoneButton={props.showDoneButton} />  
             ))}
        </ul>
    )
}

export default HabitList;