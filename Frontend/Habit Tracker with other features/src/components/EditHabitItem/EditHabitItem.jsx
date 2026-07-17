import React from 'react';
import { Box, ListItem, ListItemText, Divider } from "@mui/material";

function EditHabitItem(props) {
    return (
        <Box>
            <ListItem
                sx={{
                    py: 2,
                }}
            >
                <ListItemText 
                    primary={props.text}
                    slotProps={{
                        primary: {
                            sx: {
                                fontWeight: 550,
                            },
                        },
                    }}
                />
            </ListItem>

            <Divider />
        </Box>
    )
}

export default EditHabitItem;