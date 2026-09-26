import React from "react";
import { Box, Typography, Button, Dialog, DialogContent } from "@mui/material";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import "./SessionExpiredModal.css";

function SessionExpiredModal({ isOpen, onClose }) {

    return (
        <Dialog
            open={isOpen}
            onClose={(event, reason) => {

                if (
                    reason === "backdropClick" ||
                    reason === "escapeKeyDown"
                ) {
                    return;
                }

                onClose();
            }}
            className="session-expired-dialog"
        >
            <DialogContent className="session-expired-content">

                <Box className="session-expired-icon-container">
                    <LockClockOutlinedIcon className="session-expired-icon" />
                </Box>

                <Typography
                    variant="h5"
                    className="session-expired-title"
                >
                    Session Expired
                </Typography>

                <Typography
                    variant="body1"
                    className="session-expired-description"
                >
                    Your session has already expired. Please log in again
                    to continue.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={onClose}
                    className="session-expired-button"
                >
                    Log In Again
                </Button>

            </DialogContent>
        </Dialog>
    );
}

export default SessionExpiredModal;