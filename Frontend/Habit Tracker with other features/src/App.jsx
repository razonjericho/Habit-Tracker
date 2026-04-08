import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput';

function App() {
const [habits, setHabit] = useState([]);
  
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
    </div>
  )
}

export default App
