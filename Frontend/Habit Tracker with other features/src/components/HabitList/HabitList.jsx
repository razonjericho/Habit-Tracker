import React, { useContext } from 'react'
import HabitItem from '../HabitItem/HabitItem';
import { Box } from "@mui/material"

function HabitList(props){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",

                gap: {
                    xs: 1.5,
                    sm: 2,
                    md: 2.5,
                },
            }}
        > 
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