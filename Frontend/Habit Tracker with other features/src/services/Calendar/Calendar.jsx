import React from 'react';
import calendarGenerator from './calendarGenerator';
import { Box, Typography } from "@mui/material";

const heatColors = {
    0: "#f8f9fa",
    1: "#FDE7CF",
    2: "#FED7AA",
    3: "#FB923C",
    4: "#F97316",
};

function Calendar(props) {
    
    const weeks = calendarGenerator(
        props.year, 
        props.month, 
        props.completedDates, 
        props.heatMap
    );

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    function getDayStyles(day) {
        if (!day) {
            return {
                bgcolor: "transparent",
                cursor: "default",
            };
        }

        return {
            bgcolor: day.level > 0
                ? heatColors[day.level]
                : "background.default",

            color: day.level > 0 ? "#fff" : "text.primary",

            border: "2px solid white",
            borderRadius: "20px",

            cursor: "pointer",
        };
    }

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    mb: 1,
                }}
            >
                {weekDays.map((day) => (
                    <Typography
                        key={day}
                        variant="body2"
                        fontWeight={600}
                        color="text.secondary"
                    >
                        {day}
                    </Typography>
                ))}
            </Box>
            
            <Box
                sx={{
                    bgcolor: "background.paper",
                }}
            >
                {weeks.map((week, weekIndex) => (
                <Box 
                    key={weekIndex} 
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                    }}
                >
                    {week.map((day, dayIndex) => {
                        const isSelected = day && props.selectedDay && props.selectedDay.day === day.day;
                        return (
                            <Box 
                                key={dayIndex} 
                                onClick={() => day && props.onSelectedDay(day)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    minHeight: {
                                        xs: 32,
                                        sm: 36,
                                        md: 40,
                                    },

                                    ...getDayStyles(day),

                                    border: isSelected
                                        ? "2px solid #EA580C"
                                        : "2px solid white",

                                    boxShadow: isSelected
                                        ? "0 0 0 2px rgba(249,115,22,.25)"
                                        : "none",

                                    userSelect: "none",

                                    WebkitTapHighlightColor: "transparent",

                                    "&:focus": {
                                        outline: "none",
                                    },

                                    "&:focus-visible": {
                                        outline: "none",
                                    },
                                }} 
                            >
                                {day ? day.day.split("-")[2] : null}
                            </Box>
                        ) 
                    })}
                </Box>
            ))}
            </Box>
        </Box>
        
    )
}

export default Calendar;