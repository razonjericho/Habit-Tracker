import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import useUnauthorizedHandler from '../src/hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from './AuthenticationContext';

const HabitContext = createContext();

function HabitProvider({ children }) {
    const API_URL = "http://localhost:3000";
    const [habits, setHabit] = useState([]);
    const currentDate = new Date().toLocaleDateString("en-CA");
    const [storedDate, setStoredDate] = useState(currentDate);
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    const fetchHabits = async () => {

      try {
        const response = await axios.get(`${API_URL}/habits`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHabit(response.data);
      } catch (err) {
        handleUnauthorized(err);
        console.error('Error fetching habits:', err);
      }
    };

    useEffect(() => {
      if (token) {
        fetchHabits();
      }  
    }, [token]);

    const checkDate = () => {
      const now = new Date().toLocaleDateString("en-CA");
      try {
        if (storedDate !== now) {
          fetchHabits();
          setStoredDate(now);
          console.log("Date changed, fetching new habits");
        }
      } catch (err) {
        console.error('Error, unable to check the dates:', err);
      }
    }

    useEffect(() => {
      checkDate();

      const timer = setInterval(checkDate, 60000);

        return () => {
          clearInterval(timer);
        }
    }, [storedDate]);

    const addHabit = async (inputText) => {
      try {
        const response = await axios.post(`${API_URL}/habits`, {addHabit: inputText}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const newHabit = response.data;
        setHabit((prevHabits) => {
          return [...prevHabits, newHabit]
        })
      } catch (err) {
        handleUnauthorized(err);
        console.error('Error, unable to post new habit:', err);
      }
    }

    const editHabit = async (id, newText) => {
      try {
          const response = await axios.patch(`${API_URL}/habits/edit/rename/${id}`, {editHabit: newText}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
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
            handleUnauthorized(err);
            console.error('Error, unable to edit a habit', err);
          }
      }

    const archiveHabit = async (id) => {
      try {
          const response = await axios.patch(`${API_URL}/habits/edit/archive/${id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const archiveHabit = response.data;
          setHabit(prevHabits => {
          console.log("ARCHIVED ID:", id);
              return prevHabits.map(habit => 
                habit.id === archiveHabit.id ? archiveHabit : habit
              )
          })
          } catch (err) {
            handleUnauthorized(err);
            console.error('Error, unable to archive a habit:', err);
          }
      }

    const habitDone = async (id) => {
      try {
          const response = await axios.post(`${API_URL}/habits/${id}/completed`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
          const habitFinished = response.data;
          setHabit(prevHabits => {
            console.log(habitFinished)
            return prevHabits.map(habit =>      
                habit.id === habitFinished.id ? habitFinished : habit
            )
          })
        } catch (err) {
          handleUnauthorized(err);
          console.error(err);
        }
      }

    const restoreHabit = async (id) => {
      try {
        const response = await axios.patch(`${API_URL}/habits/edit/archive/restore/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const restoreHabit = response.data;
        setHabit(prevHabits => {
          console.log(restoreHabit);
          return prevHabits.map(habit =>
            habit.id === restoreHabit.id ? restoreHabit : habit
          )
        });
      } catch (err) {
        handleUnauthorized(err);
        console.error('Error, unable to restore a habit', err);
      }
    }

    const deleteHabit = async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/habits/edit/archive/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const deleteHabit = response.data;
        setHabit(prevHabits => {
          console.log(deleteHabit);
          return prevHabits.filter((habit) => {
            return habit.id !== Number(deleteHabit.id);
          })
        });
      } catch (err) {
        handleUnauthorized(err);
        console.error('Error, unable to delete a habit:', err)
      }
    } 

  return (
    <HabitContext.Provider value={{
      habits,
      addHabit,
      editHabit,
      archiveHabit,
      restoreHabit,
      deleteHabit,
      habitDone
    }}>
      {children}
    </HabitContext.Provider>
  )
}

export { HabitContext, HabitProvider };