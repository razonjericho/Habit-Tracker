import React, { useContext } from 'react'
import HabitItem from '../HabitItem/HabitItem';

function HabitList(props){
    return (
        <ul> 
            {props.habits.map(habit => (
            <HabitItem 
                key={habit.id} 
                id={habit.id}
                text={habit.habit}
                onDone={props.onDone} 
                onEdit={props.onEdit} 
                onDelete={props.onDelete}
            />  
             ))}
        </ul>
    )
}

export default HabitList;