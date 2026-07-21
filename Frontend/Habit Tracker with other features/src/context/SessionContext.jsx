import { React, createContext, useState } from "react";

const SessionContext = createContext();

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

export { SessionContext, SessionProvider };