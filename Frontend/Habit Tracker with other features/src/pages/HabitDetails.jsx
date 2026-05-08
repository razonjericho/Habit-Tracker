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

    const dates = streaks?.dates || [];

    const completedDates = new Set(dates);

    const year = 2026
    const month = 4;

    const startDate = new Date(year, month, 1);
    const firstDayIndex = startDate.getDay();
    const beforeFirstDay = [];

    for (let i = 0; i < firstDayIndex; i++) {
        beforeFirstDay.push(null);
    }

    const endDate = new Date(year, month + 1, 0);

    const calendarDays = [];

    let current = new Date(startDate);

    const result = [];

    while (current <= endDate) {
        const formatted = current.toLocaleDateString("en-CA");
        calendarDays.push(formatted);

        current.setDate(current.getDate() + 1);
    }
    
    for(let day of calendarDays) {
        const isCompleted = completedDates.has(day);

        result.push({
            date: day,
            completed: isCompleted
        })
    }

     const calendarCells = [
        ...beforeFirstDay,
        ...result
    ];

    const weekSize = 7;
    const weeks = [];

    for(let i = 0; i < calendarCells.length; i += weekSize){
        const week = calendarCells.slice(i, i + weekSize);
        weeks.push(week);
    }

    {weeks.map(week => (
        <div>
            {week.map(day => (
                <div>{day}</div>
            ))}
        </div>
    ))}

    return (
        <div>
            <h1>Habit Details</h1>
            <header>May</header>
            <div>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            <p>Habit: {selectedHabit.habit}</p>
            <p>Current Streak: {streaks.streak}</p>
            <p>Longest Streak: {streaks.longestStreak}</p>
        </div>
    )
}

export default HabitDetailsPage;