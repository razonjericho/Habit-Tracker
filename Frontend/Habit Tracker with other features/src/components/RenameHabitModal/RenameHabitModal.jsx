import { React, useState, useEffect } from 'react';
import { TextField, Box, Button, Stack, Dialog, DialogContent, Typography, DialogActions } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function RenameHabitModal({ isOpen, habit, onClose, onSave }) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (habit) {
            setInputText(habit.habit);
            setError("");
        }
    }, [habit]);

    if (!isOpen) {
        return null;
    }

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);

       if (error) {
            setError("");
        }
    }

    function handleSave() {
        if (inputText.trim() === "") {
            setError("Please enter a habit name");
            return;
        }

        onSave(inputText.trim());
    }

    return (
            <Dialog
                open={isOpen}
                slotProps={{
                    paper: {
                        sx: {
                            width: {
                                xs: "92%",
                                sm: 460,
                            },
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0px 20px 50px rgba(0,0,0,0.18)",
                        },
                    },
                }}
            >
                <DialogContent
                    sx={{
                        px: {
                            xs: 4,
                            sm: 5,
                        },

                        pt: {
                            xs: 5,
                            sm: 6,
                        },

                        pb: 2,

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 96,
                            height: 96,
                            borderRadius: "50%",

                            bgcolor: "#FBECE5",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            flexShrink: 0,
                        }}
                    >
                        <EditOutlinedIcon
                            sx={{
                                fontSize: 52,
                                color: "primary.main",
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            fontWeight: 700,
                        }}
                    >
                        Rename Habit
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mt: 1.5,
                            color: "text.secondary",
                            textAlign: "center",
                            maxWidth: 280,
                            lineHeight: 1.6,
                        }}
                    >
                        Enter a new name for your habit.
                    </Typography>

                    <Box
                        sx={{
                            width: "100%",
                            mt: 4,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                ml: 0.5,
                                fontWeight: 600,
                            }}
                        >
                            Habit name
                        </Typography>

                        <TextField
                            fullWidth
                            value={inputText}
                            onChange={handleChange}
                            error={Boolean(error)}
                            helperText={error}
                            placeholder="Enter habit name"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1,
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 3,

                            width: "100%",

                            bgcolor: "#FBECE5",

                            borderRadius: 1,

                            px: 2,
                            py: 1.75,

                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <InfoOutlinedIcon
                            sx={{
                                color: "primary.main",
                                mt: "2px",
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                lineHeight: 1.6,
                            }}
                        >
                            Only the habit name will change. Your streak, completion history, and progress will be kept.
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: {
                            xs: 4,
                            sm: 5,
                        },

                        pb: {
                            xs: 4,
                            sm: 5,
                        },

                        pt: 2,

                        gap: 2,
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            py: 1.3,
                            borderRadius: 1,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            color: "white",
                            height: 50,
                            lineHeight: 1.2,
                            borderRadius: 1,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "0px 4px 12px rgba(224,122,95,.25)",

                            "&:hover": {
                                boxShadow: "0px 6px 16px rgba(224,122,95,.35)",
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
    )
}

export default RenameHabitModal;