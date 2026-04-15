import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput';
import HabitItem from './components/HabitItem';
import HomePage from './pages/Home';

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

  async function editHabit(id, newText){
    try {
      const response = await axios.patch(`${API_URL}/habits/${id}`, {editHabit: newText})
      const updatedHabit = response.data.updateHabit;
      setHabit(prevHabits => {
        return prevHabits.map(habit => {
          if (habit.id === id) {
            return updatedHabit;
          } else {
            return habit;
          }
        })
      })
    } catch (err) {
      console.error('Error, unable to edit a habit', err);
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

  async function habitDone(id){
    try {
      const response = await axios.post(`${API_URL}/habits/${id}/completed`)
      const habitFinished = response.data;
      setHabit(prevHabits => {
        return prevHabits.map(habit => {
          if (habit.id === habitFinished.habit_id) {
            const updatedHabit = {
              ...habit,
              completed: habitFinished.completed,
              date: habitFinished.date
            };
            console.log(updatedHabit);
            return updatedHabit;
          } else {
            return habit;
          }
        }) 
      })
      return habitFinished;
    } catch (err) {
      console.error(err)
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
      <HomePage habits={habits} onDone={habitDone} />
    </div>
  )
}

export default App
