import React from 'react';
import calendarGenerator from './calendarGenerator';
import './Calendar.css'

function Calendar(props) {
    
    const weeks = calendarGenerator(props.year, props.month, props.completedDates);

    return (
        <div className="calendar" >
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week" >
                    {week.map((day, dayIndex) => (
                        <div key={dayIndex} className={day ? (day.completed ? "completed" : "not-completed") : "empty"} >
                            {day ? new Date(day.day).getDate() : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Calendar;