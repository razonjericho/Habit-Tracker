import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../components/HabitList/HabitList"
import { useParams } from 'react-router-dom';
import { HabitContext } from '../HabitContext';

function HabitDetailsPage(){
    const params = useParams();
    const id = Number(params.id);
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState(null);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
         const fetchStreak = async () => {
                try {
                   const response = await axios.get(`${API_URL}/habits/progress/${id}`);

                setStreak(response.data);

                } catch (err) {
                    console.error('Error, unable to get habit streak:', err);
                }
            }
                fetchStreak();
    }, [id]);

    if (streaks === null) {
        return <p>loading...</p>
    }

    const selectedHabit = habits.find(habit => habit.id === id);

    if (!selectedHabit) {
        return <p>Habit not found</p>;
    }

    return (
        <div>
            <h1>Habit Details</h1>
            <p>Habit: {selectedHabit.habit} {streaks.streak} </p>          
        </div>
    )
}

export default HabitDetailsPage;