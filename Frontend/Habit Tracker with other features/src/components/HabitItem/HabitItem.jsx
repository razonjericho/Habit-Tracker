import React from 'react';
import { Card, CardContent, Typography, Stack, Checkbox, IconButton, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./HabitItem.css";

function HabitItem(props) {
    const streak = props.streaks ? props.streaks[props.id] : undefined;
    const isDayDetails = props.status !== undefined;

    return (
        <Card
            elevation={0}
            className="habit-item-card"
            sx={{
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <CardContent className="habit-item-content">

                <Stack
                    direction="row"
                    className={`habit-item-stack ${
                        isDayDetails ? "day-details" : ""
                    }`}
                >

                    {props.status === "completed" ? (
                        <Box className="habit-item-status-completed">
                            <DoneRoundedIcon
                                className="habit-item-status-completed-icon"
                                sx={{
                                    color: "success.dark",
                                }}
                            />
                        </Box>

                    ) : props.status === "not-completed" ? (
                        <Box>
                            <RadioButtonUncheckedIcon
                                className="habit-item-status-not-completed-icon"
                                sx={{
                                    color: "text.secondary",
                                }}
                            />
                        </Box>
                    ) : null}

                    <Stack className="habit-item-info">

                        <Typography
                            variant="h6"
                            className="habit-item-title"
                        >
                            {props.text}
                        </Typography>


                        {streak !== undefined && (
                            <Stack className="habit-item-streak">

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="current-streak"
                                >
                                    Current Streak
                                </Typography>

                                <Typography
                                    variant="body1"
                                    className="habit-item-streak-value"
                                >
                                    {streak} day{streak === 1 ? "" : "s"}
                                </Typography>

                            </Stack>
                        )}

                    </Stack>

                    {props.onDone && (
                        <Checkbox
                            checked={props.isCompleted}
                            onChange={() => props.onDone(props.id)}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleRoundedIcon />}
                            className="habit-item-checkbox"
                            sx={{
                                color: "text.secondary",

                                "&.Mui-checked": {
                                    color: "primary.main",
                                },
                            }}
                        />
                    )}

                    {props.onViewDetails && (
                        <IconButton
                            onClick={() => {
                                props.onViewDetails(props.id);
                            }}
                            aria-label="View habit details"
                            className="habit-item-view-details"
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    )}

                </Stack>

            </CardContent>
        </Card>
    );
}

export default HabitItem;