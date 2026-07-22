import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Stack, Button } from "@mui/material";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AddIcon from "@mui/icons-material/Add";

function EmptyHabitState(){
const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                mt: 2,

                borderRadius: 3,

                border: "1px solid",
                borderColor: "#F4D5BF",
            }}
        >
            <CardContent
                sx={{
                    py: 4,
                    bgcolor: "#FEFAF6",
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                       alignItems:"center",
                    }}
                >
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",

                            bgcolor: "#FFF3E8",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AssignmentRoundedIcon
                            sx={{
                                color: "primary.main",
                                fontSize: 40,
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                        }}
                    >
                        No habits yet
                    </Typography>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color: "text.secondary",
                            maxWidth: 220,
                            lineHeight: 1.7,
                            mb: 2,
                        }}
                    >
                        Create your first habit to start building your daily routine.
                    </Typography>
                </Stack>

                <Stack
                    spacing={1.5}
                    sx={{
                        alignItems:"center",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => navigate("/edit")}
                        startIcon={<AddIcon />}
                        sx={{
                            color: "white",
                        }}
                    >
                            Create Habit
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default EmptyHabitState;