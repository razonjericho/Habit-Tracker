import React, {useState} from 'react';
import { TextField, Button, Stack } from "@mui/material";

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
        <Stack>
            <TextField 
                label="Habit Name" 
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
                onClick={handleAdd}
            >
                Add Habit
            </Button>
        </Stack>
    )
}

export default HabitInput;