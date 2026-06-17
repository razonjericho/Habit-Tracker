import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../../services/Calendar/Calendar';

function Tooltip (props) {
    const [ selectedDay, setSelectedDay ] = useState(null);
    const [ tooltipPosition, setTooltipPosition ] = useState(null);
    const [ clampedLeft, setClampedLeft ] = useState(null);
    
    const tooltipRef = useRef(null);
    const calendarRef = useRef(null);

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
            <div ref={calendarRef} >
                <Calendar
                    month={props.month}
                    year={props.year}
                    heatMap={props.heatMap}
                    onSelectedDay={handleSelectDay}
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

                        <button onClick={() => {props.onViewDayDetails(selectedDay.day)} }>
                            View more details
                        </button>
                </div>
            )}
        </div>
    )
}

export default Tooltip;