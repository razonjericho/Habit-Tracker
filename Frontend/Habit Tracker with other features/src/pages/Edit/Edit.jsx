import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import EditHabitList from '../../components/EditHabitList/EditHabitList';
import HabitInput from '../../components/HabitInput/HabitInput';
import { HabitContext } from '../../../Context/HabitContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import RenameHabitModal from '../../components/RenameHabitModal/RenameHabitModal';

function EditPage() {
    const context = useContext(HabitContext);
    const {habits, addHabit, editHabit, archiveHabit, restoreHabit, deleteHabit} = context;
    const activeHabits = habits.filter(habit => habit.active);
    const archivedHabits = habits.filter(habit => !habit.active);

    const [isRenameHabit, setIsRenameHabit] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const navigate = useNavigate();

    function viewHabitDetails(id) {
        navigate(`/progress/${id}`);
    }

    async function handleRenameSave(newText) {
        await editHabit(selectedHabit.id, newText);
        
        setIsRenameHabit(false);
        setSelectedHabit(null);
    }

    function handleRenameClick(id) {
        const habit = habits.find(habit => habit.id === id);

        setSelectedHabit(habit);
        setIsRenameHabit(true);
    }

    function habitRenameClose() {
        setIsRenameHabit(false);
        setSelectedHabit(null);
    }

    return (
        <Container
            sx={{
                py: {
                    xs: 3,
                    sm: 4,
                    md: 6,
                },

                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                pb: {
                    xs: 10,
                    sm: 11,
                    md: 6,
                },
            }}
        >
            <Stack spacing={2.5} >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "2.25rem",
                            md: "2.5rem",
                        },

                        fontWeight: 700,
                    }}
                >
                    Edit Habits
                </Typography>
                <RenameHabitModal isOpen={isRenameHabit} habit={selectedHabit} onClose={habitRenameClose} onSave={handleRenameSave} />
                <EditHabitList
                    mode = "active"
                    title={`Active Habits (${activeHabits.length})`}
                    description="Your current habits"
                    icon={<FormatListBulletedIcon color="primary" sx={{ fontSize: 25 }} />}
                    habits={activeHabits} 
                    onRename={handleRenameClick}
                    onArchive={archiveHabit} 
                />
                <HabitInput onAdd={addHabit} />

                <EditHabitList
                    mode = "archived"
                    title={`Archived Habits (${archivedHabits.length})`}
                    description="Habits you've archived"
                    icon={<ArchiveOutlinedIcon color="primary" sx={{ fontSize: 25 }} />}
                    habits={archivedHabits} 
                    onViewDetails={viewHabitDetails} 
                    onRestore={restoreHabit} 
                    onDelete={deleteHabit} 
                />
            </Stack>
                
        </Container>
        
    )
    
}

export default EditPage;