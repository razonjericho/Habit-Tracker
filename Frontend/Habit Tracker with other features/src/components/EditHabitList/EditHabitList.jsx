import React from 'react'
import EditHabitItem from '../EditHabitItem/EditHabitItem';
import { Box, Card, CardContent, Typography, Divider, List } from "@mui/material";

function EditHabitList(props){
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
                        {props.icon}
                    </Box>
                    
                    <Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 550,
                                fontSize: 20,
                            }}
                        >
                            {props.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color:"text.secondary", }}>
                            {props.description}
                        </Typography>
                    </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />

                    <List disablePadding> 
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
                                isLast={index === props.habits.length - 1}
                            />  
                        ))}
                    </List>
            </CardContent>
        </Card>
        
    )
}

export default EditHabitList;