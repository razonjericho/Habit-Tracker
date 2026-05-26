import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../../components/HabitList/HabitList"
import Calendar from '../../services/Calendar/Calendar';
import { HabitContext } from '../../HabitContext';
import { useNavigate } from 'react-router-dom'

function ProgressPage(props) {
    const API_URL = "http://localhost:3000";
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState({});
    const [ heatMap, setHeatMap ] = useState({});
    const activeHabits = habits.filter(habit => habit.active);
    const total = activeHabits.length;

    useEffect(() => {
        if (habits.length === 0) return;

         const fetchStreak = async () => {
                try {
                   const requests = habits.map(habit => 
                     axios.get(`${API_URL}/habits/progress/${habit.id}`)
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

    useEffect(() => {
        const fetchHeatMap = async () => {
            try {
                const response = await axios.get(`${API_URL}/habits/progress`);

                setHeatMap(response.data);
            } catch (err) {
                console.error('Error, unable to fetch completion count', err);
            }
        }

        fetchHeatMap();
    }, [])

    const navigate = useNavigate();

    function viewHabitDetails(id) {
        navigate(`/progress/${id}`);
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   
    return (
        <div>
            <h1>Progress</h1>
            <button onClick= {props.previous} > Previous </button>
            <h2>{months[props.month]} {props.year} </h2>
            <button onClick= {props.next} > Next </button>
            <Calendar
                month={props.month}
                year={props.year}
                heatMap={heatMap}
            />
            <HabitList
                habits={activeHabits}
                streaks={streaks}
                onViewDetails={viewHabitDetails}            
            />
            
        </div>
    )
}




export default ProgressPage;