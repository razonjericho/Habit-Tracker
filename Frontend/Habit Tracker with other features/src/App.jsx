import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput';

function App() {
const [habits, setHabit] = useState([]);

  async function addHabit(inputText){
      try {
        const response = await axios.post('http://localhost:3000/habits', {addHabit: inputText});
        const newHabit = response.data;
        setHabit((prevHabits) => {
          return [...prevHabits, newHabit]
        })
      } catch (err) {
        console.error('Error, unable to post new habit:', err);
      }
    }
  
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/habits');
        setHabit(response.data);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className="App">
      <h1>My Habits</h1>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>{habit.habit}</li>
        ))}
      </ul>
      <HabitInput onAdd={addHabit} />
    </div>
  )
}

export default App
