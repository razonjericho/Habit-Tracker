import React from 'react';

function HabitItem(props){
    return (
            <li>
                {props.text}
                
                {props.showDoneOnly ? 
                    (
                        <button
                        onClick= {() => {
                            props.onDone(props.id)
                        }}
                    >
                        Done
                    </button>
                    ) 
                : 
                    <div>
                        <button 
                        onClick = {() => {
                            props.onDelete(props.id);
                        }}
                        >
                            Remove Habit
                        </button>
                        <button
                            onClick = {() => {
                                const newText = prompt("Edit Habit:", props.text);
                                props.onEdit(props.id, newText);
                            }}
                        >
                            Edit Habit
                        </button>
                    </div>
                
                }
            </li>
    )
}

export default HabitItem;