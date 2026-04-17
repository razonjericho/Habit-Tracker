import React from 'react'
import HabitList from '../components/HabitList';
import HabitInput from '../components/HabitInput';

function EditPage(props) {
    return (
        <div>
            <h1>Edit Habits</h1>
            <HabitList onEdit={props.onEdit} onDelete={props.onDelete} showDoneButton={false} habits={props.habits} />
            <HabitInput onAdd={props.onAdd} />
        </div>
    )
    
}

export default EditPage;