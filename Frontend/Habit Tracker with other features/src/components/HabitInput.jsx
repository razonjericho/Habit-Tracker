import React, {useState} from 'react';

function HabitInput(props) {
    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    

    return (
        <div className="form">
            <input onChange={handleChange} type="text" value={inputText} />
            <button>
                <span>Add Habit</span>
            </button>
        </div>
    )
}

export default HabitInput;