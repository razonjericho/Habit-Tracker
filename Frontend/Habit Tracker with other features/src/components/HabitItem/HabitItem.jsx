import React from 'react';

function HabitItem(props){
    return (
            <li>
                {props.text}
                
                {props.showDoneButton ? 
                    (
                    <span>
                        <button
                                onClick= {() => {
                                    props.onDone(props.id)
                                }}
                        >
                        Done
                        </button>
                    </span>
                        
                    ) 
                : 
                    <span>
                        <button
                            onClick = {() => {
                                const newText = prompt("Rename Habit:", props.text);
                                props.onEdit(props.id, newText);
                            }}
                        >
                            Rename Habit
                        </button>
                        <button 
                            onClick = {() => {
                                props.onDelete(props.id);
                            }}
                        >
                            Remove Habit
                        </button>
                    </span>
                
                }
            </li>
    )
}

export default HabitItem;