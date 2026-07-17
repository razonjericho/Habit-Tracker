import React, {useState} from 'react';
import { TextField, Box, Button, Stack, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function HabitInput(props) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);

        if (error) {
            setError("");
        }
    }

    const handleAdd = () => {
        if (inputText.trim() === ""){
            setError("Please enter a habit name");
            return;
        }

        props.onAdd(inputText.trim());
        setInputText("");
        setError("");
    }

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <CardContent>
                <Stack
                    spacing={2}
                >
                    <Box>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: "30%",

                                        bgcolor: "#FBECE5",

                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",

                                        flexShrink: 0,
                                    }}
                                >
                                    <AddIcon 
                                        color="primary"
                                        sx={{ fontSize: 35 }}
                                    />
                                </Box>
                                

                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 0.5,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Add New Habit
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color:"text.secondary",
                                        }}
                                    >
                                        Create a new habit to track
                                    </Typography>
                                </Box>
                            </Box>  
                    </Box>
                    
                    <TextField 
                        placeholder="Enter habit name..." 
                        onChange={handleChange} 
                        value={inputText}
                        error={Boolean(error)}
                        helperText={error}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleAdd();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={
                            <AddIcon sx={{ fontSize: 20, }} />}
                        onClick={handleAdd}
                        sx={{
                            color: "common.white",
                        }}
                    >
                            Add Habit
                    </Button>
                </Stack>
            </CardContent>
            
        </Card>
        
    )
}

export default HabitInput;