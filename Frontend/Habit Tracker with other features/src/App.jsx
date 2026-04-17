import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput/HabitInput';
import HomePage from './pages/Home';
import EditPage from './pages/Edit';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

       console.log("BEFORE SETSTATE");

      setHabit(prevHabits => {
        console.log("STATE IDS:", prevHabits.map(h => h.id));
  console.log("DELETE ID:", id);

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
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onDone={habitDone} habits={habits} />} />
        <Route path="/edit" element={<EditPage onAdd={addHabit} onEdit={editHabit} onDelete={deleteHabit} habits={habits} />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
