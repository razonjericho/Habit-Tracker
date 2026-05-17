import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const HabitContext = createContext();

function HabitProvider({ children }) {
    const API_URL = "http://localhost:3000";
    const [habits, setHabit] = useState([]);
    const [archivedHabits, setArchivedHabit] = useState([]);

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

    const getArchivedHabits = async () => {
      try {
        const response = await axios.get(`${API_URL}/habits/edit/archive`);
        const archivedHabits = response.data;
        setArchivedHabit(archivedHabits);
      } catch (err) {
        console.error('Error, unable to fetch archived habits', err);
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
            const response = await axios.patch(`${API_URL}/habits/edit/rename/${id}`, {editHabit: newText})
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

    const archiveHabit = async (id) => {
        try {
            await axios.patch(`${API_URL}/habits/edit/archive/${id}`)
            setHabit(prevHabits => {
            console.log("ARCHIVED ID:", id);
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

    const restoreHabit = async (id) => {
      try {
        const response = await axios.patch(`${API_URL}/habits/edit/archive/restore/${id}`);
        const restoreHabit = response.data;
        setArchivedHabit(restoreHabit);
      } catch (err) {
        console.error('Error, unable to restore a habit', err);
      }
    }
    
  return (
    <HabitContext.Provider value={{
      habits,
      getArchivedHabits,
      addHabit,
      editHabit,
      archiveHabit,
      restoreHabit,
      habitDone
    }}>
      {children}
    </HabitContext.Provider>
  )
}

export { HabitContext, HabitProvider };