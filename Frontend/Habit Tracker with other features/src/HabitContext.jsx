import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const HabitContext = createContext();

function HabitProvider({ children }) {
    const API_URL = "http://localhost:3000";
    const [habits, setHabit] = useState([]);

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

    const getHabitStreak = async () => {
      try {
        const response = await axios.get(`${API_URL}/progress/:id`);
        const newHabit = response.data;
      } catch (err) {
        console.error('Error, unable to get habit streak:', err);
      }
    }

    const addHabit = async (inputText) => {
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

    const editHabit = async (id, newText) => {
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

    const deleteHabit = async (id) => {
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

    const habitDone = async (id) => {
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

  return (
    <HabitContext.Provider value={{
      habits,
      addHabit,
      editHabit,
      deleteHabit,
      habitDone
    }}>
      {children}
    </HabitContext.Provider>
  )
}

export {HabitContext, HabitProvider};