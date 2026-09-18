import React, { useEffect, useState, useRef } from "react";
import Calendar from "../../services/Calendar/Calendar";
import { Box, Paper, Stack, Typography, Divider} from "@mui/material";
import "./Tooltip.css";

function Tooltip(props) {
    const [selectedDay, setSelectedDay] = useState(null);

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

    function handleSelectDay(day) {
        if (selectedDay && selectedDay.day === day.day) {
            setSelectedDay(null);
        } else {
            setSelectedDay(day);
        }
    }

    function closeSelectedDay() {
        setSelectedDay(null);
    }

    useEffect(() => {
        if (!selectedDay) return;

        function handleDocumentClick(event) {
            if (tooltipRef.current?.contains(event.target)) {
                return;
            }

            if (calendarRef.current?.contains(event.target)) {
                return;
            }

            closeSelectedDay();
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [selectedDay]);

    return (
        <Box
            ref={calendarRef}
            className="tooltip-container"
        >
            <Calendar
                month={props.month}
                year={props.year}
                heatMap={props.heatMap}
                selectedDay={selectedDay}
                onSelectedDay={handleSelectDay}
            />

            <Box className="tooltip-completion-rate">
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className="tooltip-completion-label"
                >
                    Completion Rate
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    className="tooltip-heat-legend"
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
                            className="tooltip-heat-color"
                            sx={{
                                bgcolor: color,
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
                className="tooltip-day-summary"
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    Day Summary
                </Typography>

                <Divider className="tooltip-divider" />

                {selectedDay ? (
                    <Stack spacing={3}>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            className="tooltip-day-summary-date"
                        >
                            {formattedDate}
                        </Typography>

                        <Box className="tooltip-summary-grid">
                            <Box className="tooltip-summary-metric">
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
                                    {selectedDay.completed} of{" "}
                                    {selectedDay.totalHabits}
                                </Typography>
                            </Box>

                            <Divider
                                orientation="vertical"
                                flexItem
                            />

                            <Box className="tooltip-summary-metric">
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
                                    {Math.round(
                                        selectedDay.intensity * 100
                                    )}
                                    %
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            onClick={() =>
                                props.onViewDayDetails(selectedDay.day)
                            }
                            className="tooltip-view-details"
                        >
                            <Typography
                                variant="body1"
                                className="tooltip-view-details-text"
                            >
                                View Details&nbsp;&nbsp;→
                            </Typography>
                        </Box>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Typography color="text.secondary">
                            Select a day on the calendar to view its
                            completion details.
                        </Typography>
                    </Stack>
                )}
            </Paper>
        </Box>
    );
}

export default Tooltip;