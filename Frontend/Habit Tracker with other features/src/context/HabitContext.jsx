import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import useUnauthorizedHandler from "../hooks/UseUnauthorizedHandler";
import { AuthenticationContext } from "./AuthenticationContext";
import { API_URL } from "../config";

const HabitContext = createContext();

function HabitProvider({ children }) {
    const [habits, setHabit] = useState([]);

    const currentDate = new Date().toLocaleString("en-CA", {
        timeZone: "Asia/Manila",
    });

    const [storedDate, setStoredDate] = useState(currentDate);

    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    const fetchHabits = async () => {
        try {
            const response = await axios.get(`${API_URL}/habits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHabit(response.data);
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to fetch habits:", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchHabits();
        }
    }, [token]);

    const checkDate = async () => {
        const now = new Date().toLocaleString("en-CA", {
            timeZone: "Asia/Manila",
        });

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
        };
    }, [storedDate]);

    const addHabit = async (inputText) => {
        try {
            const response = await axios.post(
                `${API_URL}/habits`,
                { addHabit: inputText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newHabit = response.data;

            setHabit((prevHabits) => [...prevHabits, newHabit]);
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to post new habit:", err);
        }
    };

    const editHabit = async (id, newText) => {
        try {
            const response = await axios.patch(
                `${API_URL}/habits/edit/rename/${id}`,
                { editHabit: newText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedHabit = response.data;

            setHabit((prevHabits) =>
                prevHabits.map((habit) =>
                    habit.id === id ? updatedHabit : habit
                )
            );
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to edit a habit:", err);
        }
    };

    const archiveHabit = async (id) => {
        try {
            const response = await axios.patch(
                `${API_URL}/habits/edit/archive/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const archivedHabit = response.data;

            setHabit((prevHabits) =>
                prevHabits.map((habit) =>
                    habit.id === archivedHabit.id ? archivedHabit : habit
                )
            );
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to archive a habit:", err);
        }
    };

    const habitDone = async (id) => {
        try {
            const response = await axios.post(
                `${API_URL}/habits/${id}/completed`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const completedHabit = response.data;

            setHabit((prevHabits) =>
                prevHabits.map((habit) =>
                    habit.id === completedHabit.id ? completedHabit : habit
                )
            );
        } catch (err) {
            handleUnauthorized(err);
            console.error(err);
        }
    };

    const restoreHabit = async (id) => {
        try {
            const response = await axios.patch(
                `${API_URL}/habits/edit/archive/restore/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const restoredHabit = response.data;

            setHabit((prevHabits) =>
                prevHabits.map((habit) =>
                    habit.id === restoredHabit.id ? restoredHabit : habit
                )
            );
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to restore a habit:", err);
        }
    };

    const deleteHabit = async (id) => {
        try {
            const response = await axios.delete(
                `${API_URL}/habits/edit/archive/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const deletedHabit = response.data;

            setHabit((prevHabits) =>
                prevHabits.filter(
                    (habit) => habit.id !== Number(deletedHabit.id)
                )
            );
        } catch (err) {
            handleUnauthorized(err);
            console.error("Error, unable to delete a habit:", err);
        }
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                addHabit,
                editHabit,
                archiveHabit,
                restoreHabit,
                deleteHabit,
                habitDone,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
}

export { HabitContext, HabitProvider };