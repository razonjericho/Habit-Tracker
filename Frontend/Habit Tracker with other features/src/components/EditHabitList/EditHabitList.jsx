import React from 'react'
import EditHabitItem from '../EditHabitItem/EditHabitItem';
import { List } from "@mui/material"

function EditHabitList(props){
    return (
        <List disablePadding> 
            {props.habits.map(habit => (
                <EditHabitItem 
                    key={habit.id} 
                    id={habit.id}
                    text={habit.habit}
                    onEdit={props.onEdit} 
                    onArchive={props.onArchive}
                    onViewDetails={props.onViewDetails}
                    onRestore={props.onRestore}
                    onDelete={props.onDelete}
                />  
             ))}
        </List>
    )
}

export default EditHabitList;