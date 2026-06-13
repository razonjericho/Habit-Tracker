import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HabitList from "../../components/HabitList/HabitList";
import Calendar from '../../services/Calendar/Calendar';
import { HabitContext } from '../../HabitContext';
import { useNavigate } from 'react-router-dom';
import './Progress.css';

function ProgressPage(props) {
    const API_URL = "http://localhost:3000";
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState({});
    const [ heatMap, setHeatMap ] = useState({});
    const [ selectedDay, setSelectedDay ] = useState(null);
    const [ tooltipPosition, setTooltipPosition ] = useState(null);
    const [ clampedLeft, setClampedLeft ] = useState(null);
    const activeHabits = habits.filter(habit => habit.active === true);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    function viewDayDetails(date) {
        navigate(`/progress/day/${date}`);
    }

    function handleSelectDay(day, position){
        if (selectedDay && selectedDay.day === day.day) {
            setSelectedDay(null);
            setTooltipPosition(null);
        } else {
            setSelectedDay(day);
            setTooltipPosition(position);
        }
    }

    function closeSelectedDay(){
        setSelectedDay(null);
        setTooltipPosition(null);
    }

    const tooltipRef = useRef(null);
    const calendarRef = useRef(null);
   

    useEffect(() => {
        if (!selectedDay || !tooltipRef.current || !tooltipPosition) return;

        const size = tooltipRef.current.getBoundingClientRect();

        const tooltipWidth = size.width;
        const viewportWidth = window.innerWidth;

        const centerX = tooltipPosition.left + (tooltipPosition.width / 2);

        const idealLeft = centerX - (tooltipWidth / 2);

        const padding = 8;

        const minLeft = padding;

        const maxLeft = viewportWidth - tooltipWidth - padding;

        const safeLeft =
            Math.min(
                Math.max(idealLeft, minLeft),
                maxLeft
            );

        setClampedLeft(safeLeft);

    }, [selectedDay, tooltipPosition]);

    useEffect(() => {
        if (!selectedDay) return;

            function handleDocumentClick(event) {
                if(tooltipRef.current?.contains(event.target)) {
                    return;
                }

                if(calendarRef.current?.contains(event.target)) {
                    return;
                }
                closeSelectedDay();
            }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        }

    }, [selectedDay]);
   
    return (
        <div>
            <h1>Progress</h1>
            <button onClick= {props.previous} > Previous </button>
            <h2>{months[props.month]} {props.year} </h2>
            <button onClick= {props.next} > Next </button>
            <div ref={calendarRef} >
                <Calendar
                month={props.month}
                year={props.year}
                heatMap={heatMap}
                onSelectedDay={handleSelectDay}
                onCloseSelectedDay={closeSelectedDay}
            />
            </div>
            

            {selectedDay && (
                <div 
                className="tooltip"
                ref={tooltipRef}
                style={{
                    top: tooltipPosition.top - 95,
                    left: clampedLeft
                }}
                >
                    <p>{selectedDay.day}</p>
                    <p>{selectedDay.completed} / {selectedDay.totalHabits}</p>
                    <p>{Math.round(selectedDay.intensity * 100)}% Complete</p>

                        <button onClick={() => {viewDayDetails(selectedDay.day)} }>
                            View more details
                        </button>
                </div>
            )}

            <HabitList
                habits={activeHabits}
                streaks={streaks}
                onViewDetails={viewHabitDetails}            
            />
            
        </div>
    )
}




export default ProgressPage;