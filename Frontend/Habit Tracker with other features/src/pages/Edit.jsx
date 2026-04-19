import React from 'react'
import HabitList from '../components/HabitList/HabitList';
import HabitInput from '../components/HabitInput/HabitInput';

function EditPage(props) {
    const mode = "edit";

    return (
        <div>
            <h1>Edit Habits</h1>
            <HabitList 
                onEdit={props.onEdit} 
                onDelete={props.onDelete} 
                habits={props.habits} 
                mode={mode} 
            />
            <HabitInput onAdd={props.onAdd} />
        </div>
    )
    
}

export default EditPage;