import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import HabitInput from './components/HabitInput/HabitInput';
import HomePage from './pages/Home';
import EditPage from './pages/Edit';
import ProgressPage from './pages/Progress'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HabitList from './components/HabitList/HabitList';

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
      const updatedHabit = response.data;
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
        console.log(habitFinished)
        return prevHabits.map(habit =>      
            habit.id === habitFinished.id ? {...habit, isCompleted: habitFinished.isCompleted, date: habitFinished.date} : habit
        )
      })
    } catch (err) {
      console.error(err);
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
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
      <BottomNav />
      </BrowserRouter>
    </div>
  )
}

export default App
