import React, { createContext, useState } from "react";

export const SessionContext = createContext();

function SessionProvider({ children }) {
    const [ isSessionExpired, setIsSessionExpired ] = useState(false);

    return (
        <SessionContext.Provider value ={{
            isSessionExpired,
            setIsSessionExpired
        }}>
            {children}
        </SessionContext.Provider>
    )

}

export default SessionProvider;