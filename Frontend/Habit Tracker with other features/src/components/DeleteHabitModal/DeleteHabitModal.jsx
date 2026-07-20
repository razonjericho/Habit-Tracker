import React from 'react';
import { TextField, Box, Button, Stack, Dialog, DialogContent, Typography, DialogActions } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

function DeleteHabitModal({ isOpen, habit, onClose, onDelete }) {
    if (!isOpen) {
        return null;
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

                            bgcolor: "#FEE2E2",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            flexShrink: 0,
                        }}
                    >
                        <DeleteOutlinedIcon
                            sx={{
                                fontSize: 52,
                                color: "error.main",
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            fontWeight: 700,
                            color: "error.main",
                        }}
                    >
                        Delete Habit
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            fontWeight: 700,
                        }}
                    >
                        Are you sure you want to delete this habit?
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
                        This action cannot be undone and all habit data will be permanently lost.
                    </Typography>

                    <Box
                        sx={{
                            mt: 3,

                            width: "100%",

                            bgcolor: "#FDECEC",

                            borderRadius: 1,

                            px: 2,
                            py: 1.75,

                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                        }}
                    >
                        <WarningAmberRoundedIcon
                            sx={{
                                color: "error.main",
                                mt: "8px",
                            }}
                        />

                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "error.main",
                                    lineHeight: 1.6,
                                    fontWeight: 700,
                                }}
                            >
                                This will permanently delete:
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    color: "text.secondary",
                                }}
                            >
                                <strong>"{habit?.habit}"</strong> and all of its progress.
                            </Typography>
                        </Box>
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
                        onClick={onDelete}
                        sx={{
                            color: "white",
                            backgroundColor: "error.main",
                            height: 50,
                            lineHeight: 1.2,
                            borderRadius: 1,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "0px 4px 12px rgba(211,47,47,.25)",

                            "&:hover": {
                                backgroundColor: "error.dark",
                                boxShadow: "0px 6px 16px rgba(211,47,47,.35)",
                            },
                        }}
                    >
                        Delete Habit
                    </Button>
                </DialogActions>
                    
                
                
            </Dialog>
    )
}

export default DeleteHabitModal;