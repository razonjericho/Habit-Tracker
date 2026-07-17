import React from 'react';
import { Card, CardContent, Typography, Stack, Checkbox, IconButton, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function HabitItem(props){
    const streak = props.streaks ? props.streaks[props.id] : undefined;
    const isDayDetails = props.status !== undefined;

    return (
            <Card
                elevation={0}
                sx={{
                    borderRadius: 1.5,

                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 2.5,
                            md: 3,
                        },

                        "&:last-child": {
                            pb: {
                                xs: 2,
                                sm: 2.5,
                                md: 3,
                            },
                        },
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: isDayDetails ? "flex-start" : "space-between",
                            alignItems: "center",
                        }}
                    >
                        {props.status === "completed" ? (
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",

                                    bgcolor: "#EAF6E8",

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    flexShrink: 0,
                                }}
                            >
                                <DoneRoundedIcon
                                    sx={{
                                        color: "success.dark",
                                        fontSize: 25,
                                    }}
                                />
                            </Box>
                        ) : props.status === "not-completed" ? (
                            <Box>
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 25,
                                        mt: 0.5,
                                        pr: 0.5,
                                    }}
                                />
                            </Box>
                        ) : null}

                        <Stack>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: {
                                        xs: "1.2rem",
                                        sm: "1.3rem",
                                        md: "1.4rem",
                                    },
                                    fontWeight: 600,
                                }}
                            >
                                {props.text}
                            </Typography>

                            {streak !== undefined && (
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        mt: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Current Streak
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#F97316",
                                            fontWeight: 550,
                                        }}
                                    >
                                        {streak} day{streak === 1 ? "" : "s"}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack> 
                        
                        {props.onDone && (
                                <Checkbox
                                    checked={props.isCompleted}
                                    onChange= {() => {props.onDone(props.id)}}
                                    sx={{
                                        p: {
                                            xs: 0.5,
                                            sm: 0.75,
                                            md: 1,
                                        },
                                    }}
                                />
                                
                        )}

                        {props.onViewDetails && ( 
                                <IconButton 
                                    onClick={() => {props.onViewDetails(props.id)}}
                                    aria-label="View habit details"
                                > 
                                    <ChevronRightIcon />
                                </IconButton>
                        )}

                    </Stack>
                </CardContent>
            </Card>
    )
}

export default HabitItem;