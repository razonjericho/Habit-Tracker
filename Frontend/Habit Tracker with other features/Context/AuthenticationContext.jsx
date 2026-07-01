import React, { createContext, useState } from "react";

const AuthenticationContext = createContext();

function AuthenticationProvider ({ children }) {
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }


    return (
        <AuthenticationContext.Provider value={{token, setToken, logout}}>
            {children}
        </AuthenticationContext.Provider>
    )

}

export { AuthenticationContext, AuthenticationProvider };