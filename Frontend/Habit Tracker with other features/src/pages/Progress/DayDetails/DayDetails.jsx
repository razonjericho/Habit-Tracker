import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HabitList from '../../../components/HabitList/HabitList';
import useUnauthorizedHandler from '../../../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';

function DayDetails () {
    const { date } = useParams();
    const API_URL = "http://localhost:3000";
    const [ dayDetails, setDayDetails ]   = useState(null);;
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    useEffect(() => {
        const fetchDayDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/habits/progress/day/${date}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDayDetails(response.data);
            } catch (err) {
                handleUnauthorized(err);
                console.error('Error, unable to load the details of this date', err);
            }
        }
            fetchDayDetails();
    }, [date]);

    const habitsForDay = dayDetails?.dayDetails || [];

    const incompletedHabits = habitsForDay.filter(habit => !habit.isCompleted);
    const completedHabits = habitsForDay.filter(habit => habit.isCompleted);

    return (
        <div>
            <h1>Day Details</h1>
            <h2>Date</h2>
            <p>{dayDetails?.date}</p>
            <h3>Completed Habits</h3>
                <HabitList habits={completedHabits} />
            <h3>Not Completed Habits</h3>
                <HabitList habits={incompletedHabits} />
            
        </div>
    )
    
}

export default DayDetails;