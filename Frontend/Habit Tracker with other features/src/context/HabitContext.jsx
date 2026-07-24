import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import useUnauthorizedHandler from '../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from './AuthenticationContext';
import { API_URL } from '../config';

const HabitContext = createContext();

function HabitProvider({ children }) {
    
    const [habits, setHabit] = useState([]);
    const currentDate = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Manila",
    });
    const [storedDate, setStoredDate] = useState(currentDate);
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    const fetchHabits = async () => {
      try {
          console.log("===== fetchHabits =====");
          console.log("Token:", token);
          console.log("Authorization:", `Bearer ${token}`);
          console.log("Token before fetch:", token);
          console.log("Current date:", new Date().toLocaleString());

          const response = await axios.get(`${API_URL}/habits`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          console.log("Response status:", response.status);
          console.log("Fetched habits:", response.data);

          console.table(
              response.data.map(h => ({
                  habit: h.habit,
                  completed: h.isCompleted,
                  active: h.active,
              }))
          );

          setHabit(response.data);

          console.log("setHabit() called");
          console.log("=======================");

      } catch (err) {
          console.log("===== fetchHabits ERROR =====");
          console.log("Status:", err.response?.status);
          console.log("Response:", err.response?.data);
          console.log("Token:", token);
          console.log("Authorization:", `Bearer ${token}`);
          console.log(err);
          console.log("============================");

          handleUnauthorized(err);
      }
  };

    useEffect(() => {
      if (token) {
        fetchHabits();
      }  
    }, [token]);

    useEffect(() => {
        console.log("Habits state updated:", habits);
    }, [habits]);

    const checkDate = async () => {
      const now = "2099-01-01";

      try {
          if (storedDate !== now) {
              console.log("Date changed, fetching new habits");

              await fetchHabits();

              setStoredDate(now);
          }
      } catch (err) {
          console.error(err);
      }
  };

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