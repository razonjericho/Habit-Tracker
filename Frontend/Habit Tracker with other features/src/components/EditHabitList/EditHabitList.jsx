import React from "react";
import EditHabitItem from "../EditHabitItem/EditHabitItem";
import { Box, Card, CardContent, Typography, Divider, List } from "@mui/material";
import "./EditHabitList.css";

function EditHabitList(props) {
    return (
        <Card
            elevation={0}
            className="edit-habit-list-card"
        >
            <CardContent className="edit-habit-list-content">

                <Box className="edit-habit-list-header">

                    <Box className="edit-habit-list-icon">
                        {props.icon}
                    </Box>

                    <Box>
                        <Typography
                            variant="h6"
                            className="edit-habit-list-title"
                        >
                            {props.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="edit-habit-list-description"
                        >
                            {props.description}
                        </Typography>
                    </Box>

                </Box>

                <Divider className="edit-habit-list-divider" />

                <List
                    disablePadding
                    className="edit-habit-list-items"
                >
                    {props.habits.map((habit, index) => (
                        <EditHabitItem
                            key={habit.id}
                            id={habit.id}
                            text={habit.habit}
                            mode={props.mode}
                            onRename={props.onRename}
                            onArchive={props.onArchive}
                            onViewDetails={props.onViewDetails}
                            onRestore={props.onRestore}
                            onDelete={props.onDelete}
                            isLast={
                                index === props.habits.length - 1
                            }
                        />
                    ))}
                </List>

            </CardContent>
        </Card>
    );
}

export default EditHabitList;