import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput';
import HabitItem from './components/HabitItem';

function App() {
const API_URL = "http://localhost:3000";
const [habits, setHabit] = useState([]);

  async function addHabit(inputText){
      try {
        const response = await axios.post(`${API_URL}/habits`, {addHabit: inputText});
        const newHabit = response.data;
        setHabit((prevHabits) => {
          return [...prevHabits, newHabit]
        })
      } catch (err) {
        console.error('Error, unable to post new habit:', err);
      }
    }

  async function deleteHabit(id){
    try {
      await axios.delete(`${API_URL}/habits/${id}`)
      setHabit(prevHabits => {
        return prevHabits.filter(habit => habit.id !== id)
      })
    } catch (err) {
      console.error('Error, unable to delete a habit:', err);
    }
  }
  
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${API_URL}/habits`);
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
          <HabitItem key={habit.id} id={habit.id} text={habit.habit} onDelete={deleteHabit} />
        ))}
      </ul>
      <HabitInput onAdd={addHabit} />
    </div>
  )
}

export default App
