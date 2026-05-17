import React from 'react';
import "./HabitItem.css"

function HabitItem(props){
    const streak = props.streaks ? props.streaks[props.id] : undefined;

    return (
            <li>
                {props.text} {streak}
                     {props.onEdit && (
                        <span>
                            <button
                                onClick = {() => {
                                    const newText = prompt("Rename Habit:", props.text);
                                    props.onEdit(props.id, newText);
                                }}
                            >
                                Rename Habit
                            </button>
                            <button onClick = {() => {props.onArchive(props.id);}}>
                                Archive Habit
                            </button>
                        </span>
                     )}  
                     
                    {props.onDone && (
                        <span>
                            <button onClick= {() => {props.onDone(props.id)}}>
                                {props.isCompleted ? "Undo" : "Done"}
                            </button>
                        </span> 
                    )}

                    {props.onViewDetails && (
                        <span>
                             <button onClick={() => {props.onViewDetails(props.id)}}>
                                Details
                            </button>
                        </span>
                    )}

                    {props.onRestore && (
                        <span>
                             <button onClick={() => {props.onRestore(props.id)}}>
                                Restore Habit
                            </button>
                        </span>
                    )} 
                   
            </li>
    )
}

export default HabitItem;