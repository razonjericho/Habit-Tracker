import React, { useEffect, useState, useRef } from 'react';
import Calendar from '../../services/Calendar/Calendar';
import { Box, Paper, Stack, Typography, Button, Divider, Card, CardContent } from "@mui/material";

function Tooltip (props) {
    const [ selectedDay, setSelectedDay ] = useState(null);
    
    const tooltipRef = useRef(null);
    const calendarRef = useRef(null);

    const formattedDate = selectedDay
        ? new Date(selectedDay.day).toLocaleDateString("en-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "";

    const heatColors = {
        0: "#f8f9fa",
        1: "#FDE7CF",
        2: "#FED7AA",
        3: "#FB923C",
        4: "#F97316",
    };

    function handleSelectDay(day){
        if (selectedDay && selectedDay.day === day.day) {
            setSelectedDay(null);
        } else {
            setSelectedDay(day);
        }
    }

    function closeSelectedDay(){
        setSelectedDay(null);
    }

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
        <Box ref={calendarRef} >
            <Calendar
                month={props.month}
                year={props.year}
                heatMap={props.heatMap}
                selectedDay={selectedDay}
                onSelectedDay={handleSelectDay}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    mt: {
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    },

                    mb: {
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    },
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Completion Rate
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignItems:"center",
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        0%
                    </Typography>

                    {Object.values(heatColors).map((color, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: {
                                    xs: 18,
                                    sm: 20,
                                    md: 22,
                                },

                                height: {
                                    xs: 10,
                                    sm: 12,
                                    md: 14,
                                },

                                bgcolor: color,

                                borderRadius: "999px",

                                border:
                                    index === 0
                                        ? "1px solid"
                                        : "none",

                                borderColor: "divider",

                                position: "relative",
                                top: "-1px",
                            }}
                        />
                    ))}

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        100%
                    </Typography>
                </Stack>
            </Box>
                <Paper 
                    ref={tooltipRef}
                    elevation={0}
                    sx={{
                        mt: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        },

                        p: {
                                xs: 2,
                                sm: 2.5,
                                md: 3,
                            },

                        bgcolor: "background.default",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        Day Summary
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {selectedDay ? (
                        <Stack spacing={3} >
                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >
                                {formattedDate}
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto 1fr",
                                    alignItems: "center",
                                    gap: 3,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Completed Habits
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                    >
                                        {selectedDay.completed} of {selectedDay.totalHabits}
                                    </Typography>
                                </Box>

                                <Divider orientation="vertical" flexItem />

                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Completion Rate
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                    >
                                        {Math.round(selectedDay.intensity * 100)}%
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                onClick={() => props.onViewDayDetails(selectedDay.day)}
                                sx={{
                                    alignSelf: "center",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    WebkitUserSelect: "none",
                                    MozUserSelect: "none",
                                    msUserSelect: "none",
                                    WebkitTapHighlightColor: "transparent", 
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "#F97316",
                                        fontWeight: 550,
                                        fontSize: "1.05rem",
                                    }}
                                >
                                    View Details&nbsp;&nbsp;→
                                </Typography>
                                
                            </Box>
                        </Stack>
                    ) : (
                        <Stack spacing={1}>
                            <Typography color="text.secondary">
                                Select a day on the calendar to view its completion
                                details.
                            </Typography>
                        </Stack>
                    )}
                </Paper>
        </Box>
    )
}

export default Tooltip;