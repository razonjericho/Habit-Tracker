import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DayDetails () {
    const { date } = useParams();
    const API_URL = "http://localhost:3000";
    const [ dayDetails, setDayDetails ]   = useState(null);

    useEffect(() => {
        const fetchDayDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/habits/progress/day/${date}`);

                setDayDetails(response.data);
            } catch (err) {
                console.error('Error, unable to load the details of this date', err);
            }
        }
            fetchDayDetails();
    }, [date]);

    return (
        <div>
            <h1>Day Details</h1>
            <p>{dayDetails?.date}</p>
        </div>
    )
    
}

export default DayDetails;