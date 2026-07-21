import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircle";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";


function CompletedHabitState(){
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
                    py: 6,
                    bgcolor: "#FEFAF6",
                }}
            >
                <Stack
                    spacing={1.5}
                    sx={{
                       alignItems:"center",
                    }}
                >
                    <Box
                        sx={{
                            width: 72,
                            height: 72,

                            borderRadius: "50%",

                            bgcolor: "#EAF6E8",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DoneRoundedIcon
                            sx={{
                                color: "success.dark",
                                fontSize: 42,
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
                        All done for today!
                    </Typography>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color:"text.secondary",
                            maxWidth: 180,
                            lineHeight: 1.6,
                        }}
                    >
                        Great job! You've completed all your habits.
                    </Typography>
                    
                </Stack>
                
            </CardContent>
        </Card>
    )
}

export default CompletedHabitState;