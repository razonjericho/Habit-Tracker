import React from 'react';
import { Card, CardContent, Typography, Stack } from "@mui/material";

function HabitItem(props){
    const streak = props.streaks ? props.streaks[props.id] : undefined;

    return (
            <Card
                elevation={0}
                sx={{
                    borderRadius: 1.5,

                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 2.5,
                            md: 3,
                        },

                        "&:last-child": {
                            pb: {
                                xs: 2,
                                sm: 2.5,
                                md: 3,
                            },
                        },
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
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
                    </Stack>
                </CardContent>
            </Card>
    )
}

export default HabitItem;