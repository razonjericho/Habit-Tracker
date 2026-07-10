import React, { useContext } from 'react';
import HabitList from '../../components/HabitList/HabitList';
import { HabitContext } from '../../../Context/HabitContext';
import { Container, Box, Typography } from "@mui/material";

function HomePage() {
    const context = useContext(HabitContext);
    const {habits, habitDone} = context;
    const todoHabits = habits.filter(habit => habit.active && !habit.isCompleted);
    const doneHabits = habits.filter(habit => habit.active && habit.isCompleted);

    return (
        <Container
            sx={{
                py: {
                    xs: 3,
                    sm: 4,
                    md: 6,
                },

                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                pb: {
                    xs: 10,
                    sm: 11,
                    md: 6,
                },
            }}
        >
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                    fontSize: {
                        xs: "2rem",
                        sm: "2.25rem",
                        md: "2.5rem",
                    },

                    fontWeight: 700,
                }}
            >
                Home
            </Typography>

            <Box
                sx={{
                    mt: {
                        xs: 4,
                        sm: 5,
                        md: 6,
                    },
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.35rem",
                            md: "1.5rem",
                        },

                        fontWeight: 600,
                    }}
                >
                    To Do
                </Typography>
                <HabitList 
                    habits={todoHabits}
                    onDone={habitDone}
                />
            </Box>
            
            <Box 
                sx={{
                    mt: {
                        xs: 4,
                        sm: 5,
                        md: 6,
                    },
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.35rem",
                            md: "1.5rem",
                        },

                        fontWeight: 600,
                    }}
                >
                    Done
                </Typography>
                <HabitList 
                    habits={doneHabits}
                    onDone={habitDone}
                /> 
            </Box>
            
        </Container> 
    )
}

export default HomePage;