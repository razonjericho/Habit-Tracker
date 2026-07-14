import React from 'react';
import { Card, CardContent, Typography, Stack, Button, Checkbox } from "@mui/material";

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
                        }}
                    >
                        <Stack>
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

                            {streak !== undefined && (
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        mt: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Current Streak
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        color="primary"
                                    >
                                        {streak} day{streak === 1 ? "" : "s"}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                        
                        
                        {props.onEdit && (
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick = {() => {
                                        const newText = prompt("Rename Habit:", props.text);
                                        props.onEdit(props.id, newText);
                                    }}
                                >
                                    Rename Habit
                                </Button>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick = {() => {props.onArchive(props.id);}}
                                >
                                    Archive Habit
                                </Button>
                            </Stack>
                        )}  
                        
                        {props.onDone && (
                                <Checkbox
                                    checked={props.isCompleted}
                                    onChange= {() => {props.onDone(props.id)}}
                                    sx={{
                                        p: {
                                            xs: 0.5,
                                            sm: 0.75,
                                            md: 1,
                                        },
                                    }}
                                />
                                
                        )}

                        {props.onViewDetails && ( 
                                <Button 
                                    variant="contained"
                                    size="small"
                                    onClick={() => {props.onViewDetails(props.id)}}
                                >
                                    Details
                                </Button>
                        )}

                        {props.onRestore && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {props.onRestore(props.id)}}
                                >
                                    Restore Habit
                                </Button>
                        )} 

                        {props.onDelete && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        const confirmDelete = window.confirm( "Are you sure you want to delete this habit? This action cannot be undone and all habit data will be permanently lost.")

                                        if (confirmDelete) {
                                            props.onDelete(props.id);
                                        }
                                        }} 
                                    >
                                    Delete Habit
                                </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
    )
}

export default HabitItem;