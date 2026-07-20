import React from 'react';
import { Box, Typography, Button, Dialog, DialogContent } from "@mui/material";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined"

function SessionExpiredModal({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
            <Dialog
                open={isOpen}
                onClose={(event, reason) => {

                    if (reason === "backdropClick" || reason === "escapeKeyDown") {
                        return;
                    }

                    onClose();
                }}
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
                        p: {
                            xs: 4,
                            sm: 5,
                        },

                        "&:last-child": {
                            pb: {
                                xs: 4,
                                sm: 5,
                            },
                        },

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
                        <LockClockOutlinedIcon
                            sx={{
                                fontSize: 48,
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
                        Session Expired
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 1,
                                color: "text.secondary",
                                textAlign: "center",
                                maxWidth: 320,
                                mx: "auto",
                                lineHeight: 1.6,
                            }}

                        >
                            Your session has already expired. Please log in again to continue.
                        </Typography>
                    </Box>
                    
                    <Button 
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            mt: 4,
                            color: "white",
                            py: 1.4,
                            borderRadius: 3,
                        }}
                        onClick={onClose} >
                            Log In Again
                    </Button>
                </DialogContent>
            </Dialog>
    )
}

export default SessionExpiredModal;