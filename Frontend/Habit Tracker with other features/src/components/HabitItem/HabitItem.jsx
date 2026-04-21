import React from 'react';
import "./HabitItem.css"

function HabitItem(props){

    const isTodo = props.mode === "todo";
    const isEdit = props.mode === "edit";
    return (
            <li>
                {props.text}
                
                {isEdit ? 
                    (   
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
                        
                    ) 
                : 
                   <span>
                        <button
                                onClick= {() => {
                                    props.onDone(props.id)
                                }}
                        >
                        {isTodo ? "Done" : "Undo"}
                        </button>
                    </span>
                
                }
            </li>
    )
}

export default HabitItem;