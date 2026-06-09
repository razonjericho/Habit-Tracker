import React from 'react';
import calendarGenerator from './calendarGenerator';
import './Calendar.css'

function Calendar(props) {
    
    const weeks = calendarGenerator(
        props.year, 
        props.month, 
        props.completedDates, 
        props.heatMap
    );

    return (
        <div>
            <div className="weekly-header" >
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            
            <div className="calendar" >
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week" >
                    {week.map((day, dayIndex) => (
                        <div 
                        key={dayIndex} 
                        className={
                            day 
                            ? day.level > 0 
                                ? `heat-${day.level}` 
                                : (day.isCompleted ? "completed" : "not-completed") 
                            : "empty"
                        }
                        onMouseEnter={(event) => {
                            const position = event.currentTarget.getBoundingClientRect();
                            props.onSelectedDay(day, position);
                        }}
                        onMouseLeave={() => {
                            props.onCloseSelectedDay();
                        }}
                        onClick={(event) => {
                            const position = event.currentTarget.getBoundingClientRect();
                            props.onSelectedDay(day, position);
                        }}
                        >
                            {day ? new Date(day.day).getDate() : null}
                        </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
        
    )
}

export default Calendar;