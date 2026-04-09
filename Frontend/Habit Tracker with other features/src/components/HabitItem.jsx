import React from 'react';

function HabitItem(props){
    return (
            <li>
                {props.text}
                <button 
                    onClick = {() => {
                        props.onDelete(props.id);
                    }}
                >
                    Remove Habit
                </button>
            </li>
    )
}

export default HabitItem;