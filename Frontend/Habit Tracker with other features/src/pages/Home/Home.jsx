import React, { useContext } from "react";
import HabitList from "../../components/HabitList/HabitList";
import { HabitContext } from "../../context/HabitContext";
import { Container, Box, Typography } from "@mui/material";
import CompletedHabitState from "../../components/CompletedHabitState/CompletedHabitState";
import EmptyHabitState from "../../components/EmptyHabitState/EmptyHabitState";
import "./Home.css";


function HomePage() {
    const context = useContext(HabitContext);
    const { habits, habitDone } = context;

    const todoHabits = habits.filter(habit => habit.active && !habit.isCompleted);
    const doneHabits = habits.filter(habit => habit.active && habit.isCompleted);
    const activeHabits = habits.filter(habit => habit.active);

    return (
        <Container className="home-container">
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                className="home-title"
            >
                Home
            </Typography>

            {activeHabits.length === 0 ? (
                <EmptyHabitState />
            ) : (
                <Box>
                    <Box className="home-section">
                        <Typography
                            variant="h4"
                            gutterBottom
                            className="home-section-title"
                        >
                            To Do
                        </Typography>

                        {todoHabits.length > 0 ? (
                            <HabitList
                                habits={todoHabits}
                                onDone={habitDone}
                            />
                        ) : (

                            <CompletedHabitState />

                        )}
                    </Box>

                    <Box className="home-section">
                        <Typography
                            variant="h4"
                            gutterBottom
                            className="home-section-title"
                        >
                            Done
                        </Typography>

                        <HabitList
                            habits={doneHabits}
                            onDone={habitDone}
                        />
                    </Box>

                </Box>

            )}

        </Container>
    );
}

export default HomePage;