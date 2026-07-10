import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";

function HabitItem(props){
    const streak = props.streaks ? props.streaks[props.id] : undefined;

    return (
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: "1.2rem",
                                sm: "1.3rem",
                                md: "1.4rem",
                            },
                            fontWeight: 600,
                        }}
                    >
                        {props.text}
                    </Typography>
                     {streak}
                     {props.onEdit && (
                        <span>
                            <button
                                onClick = {() => {
                                    const newText = prompt("Rename Habit:", props.text);
                                    props.onEdit(props.id, newText);
                                }}
                            >
                                Rename Habit
                            </button>
                            <button onClick = {() => {props.onArchive(props.id);}}>
                                Archive Habit
                            </button>
                        </span>
                     )}  
                     
                    {props.onDone && (
                        <span>
                            <button onClick= {() => {props.onDone(props.id)}}>
                                {props.isCompleted ? "Undo" : "Done"}
                            </button>
                        </span> 
                    )}

                    {props.onViewDetails && (
                        <span>
                             <button onClick={() => {props.onViewDetails(props.id)}}>
                                Details
                            </button>
                        </span>
                    )}

                    {props.onRestore && (
                        <span>
                             <button onClick={() => {props.onRestore(props.id)}}>
                                Restore Habit
                            </button>
                        </span>
                    )} 

                    {props.onDelete && (
                        <span>
                            <button 
                                onClick={() => {
                                    const confirmDelete = window.confirm( "Are you sure you want to delete this habit? This action cannot be undone and all habit data will be permanently lost.")

                                    if (confirmDelete) {
                                        props.onDelete(props.id);
                                    }
                                    }} 
                                >
                                Delete Habit
                            </button>
                        </span>
                    )}

                </CardContent>
            </Card>
    )
}

export default HabitItem;