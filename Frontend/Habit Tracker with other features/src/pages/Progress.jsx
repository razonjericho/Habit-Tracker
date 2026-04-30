import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../components/HabitList/HabitList"
import { HabitContext } from '../HabitContext';

function ProgressPage() {
    const API_URL = "http://localhost:3000";
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState({});

    useEffect(() => {
        if (habits.length === 0) return;

         const fetchStreak = async () => {
                try {
                   const requests = habits.map(habit => 
                     axios.get(`${API_URL}/progress/${habit.id}`)
                );

                const responses = await Promise.all(requests);

                const streakData = {};
                responses.forEach(response => {
                    const { habit_id, streak } = response.data;
                    streakData[habit_id] = streak;
                })
                
                setStreak(streakData);

                } catch (err) {
                    console.error('Error, unable to get habit streak:', err);
                }
            }
                fetchStreak();
    }, [habits]);

   
    return (
        <div>
            <h2>Progress</h2>
            <HabitList
                habits={habits}
                streaks={streaks}            
            />
            
        </div>
    )
}

export default ProgressPage;