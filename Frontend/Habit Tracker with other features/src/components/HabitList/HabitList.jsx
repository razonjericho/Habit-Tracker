import React, { useContext } from 'react'
import HabitItem from '../HabitItem/HabitItem';
import { Box } from "@mui/material";
import "./HabitList.css";

function HabitList(props){
    return (
        <Box className="habit-list">
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
                    onDelete={props.onDelete}
                    status={props.status}
                />  
            ))}
        </Box>
    )
}

export default HabitList;