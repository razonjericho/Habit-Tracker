import React, {useState} from 'react';

function HabitInput(props) {
    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }


    return (
        <div className="form">
            <input id="habit-input" name="habit" type="text" onChange={handleChange} value={inputText} />
            <button
            onClick={() => {
                props.onAdd(inputText);
                setInputText("");
            }}
            >
                <span>Add Habit</span>
            </button>
        </div>
    )
}

export default HabitInput;