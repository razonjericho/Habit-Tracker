import React from 'react'
import HabitList from '../components/HabitList';
import HabitInput from '../components/HabitInput';

function EditPage(props) {
    return (
        <div>
            <h1>Edit Habits</h1>
            <HabitList onAdd={props.onAdd} onEdit={props.onEdit} onDelete={props.onDelete} showDoneButton={false} habits={props.habits} />
        </div>
    )
    
}

export default EditPage;