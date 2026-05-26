import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../../components/HabitList/HabitList"
import { useParams } from 'react-router-dom';
import { HabitContext } from '../../HabitContext';
import './HabitDetails.css'
import Calendar from '../../services/Calendar/Calendar';

function HabitDetailsPage(props){
    const params = useParams();
    const id = Number(params.id);
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState(null);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
         const fetchStreak = async () => {
                try {
                   const response = await axios.get(`${API_URL}/habits/progress/${id}/details`);

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

    const dates = streaks ? streaks.dates : [];

    const completedDates = new Set(
        dates.map(date =>
            new Date(date).toLocaleDateString("en-CA")
        )
    );

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div>
            <h1>Habit Details</h1>
            <button onClick={props.previous}>Previous</button>
            <h2>{months[props.month]} {props.year}</h2>
            <button onClick={props.next}>Next</button>
            <Calendar 
                year={props.year} 
                month={props.month} 
                completedDates={completedDates}
            />
            <p>Habit: {selectedHabit.habit}</p>
            <p>Current Streak: {streaks.streak}</p>
            <p>Longest Streak: {streaks.longestStreak}</p>
        </div>
    )
}

export default HabitDetailsPage;