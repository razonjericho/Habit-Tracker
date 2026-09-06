import React, { createContext, useState } from "react";
import axios from 'axios';
import { API_URL } from "../config";

const AuthenticationContext = createContext();

function AuthenticationProvider ({ children }) {
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    async function login(email, password) {
        
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            localStorage.setItem(
                "token",
                response.data.token
            )
            setToken(response.data.token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }


    return (
        <AuthenticationContext.Provider value={{token, login, logout}}>
            {children}
        </AuthenticationContext.Provider>
    )

}

export { AuthenticationContext, AuthenticationProvider };