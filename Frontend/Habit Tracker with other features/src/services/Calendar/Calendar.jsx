import React from 'react';
import calendarGenerator from './calendarGenerator';

function Calendar(props) {
    
    const weeks = calendarGenerator(props.year, props.month);

    return (
        <div className="calendar" >
            {weeks.map((week, weekIndex) => (
                <div className="week" key={weekIndex} >
                    {week.map((day, dayIndex) => (
                        <div className="day" key={dayIndex} >
                            {day ? new Date(day).getDate() : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Calendar;