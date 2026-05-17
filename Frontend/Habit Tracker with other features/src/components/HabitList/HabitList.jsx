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
                onArchive={props.onArchive}
                onViewDetails={props.onViewDetails}
                streaks={props.streaks}
                isCompleted={habit.isCompleted}
                onRestore={props.onRestore}
            />  
             ))}
        </ul>
    )
}

export default HabitList;