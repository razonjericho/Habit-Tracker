import React, { createContext, useState } from "react";

const AuthenticationContext = createContext();

function AuthenticationProvider ({ children }) {
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    setToken();

    return (
        <AuthenticationContext.Provider value={{token, setToken}}>
            {children}
        </AuthenticationContext.Provider>
    )

}

export default AuthenticationProvider;