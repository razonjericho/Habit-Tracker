import React, { useContext } from 'react';
import { SessionContext } from "../context/SessionContext";

function useUnauthorizedHandler() {
    const { setIsSessionExpired } = useContext(SessionContext);

    const handleUnauthorized = (err) => {
      if (err.response && err.response.status === 401) { 
            setIsSessionExpired(true);
        } 
    }

    return handleUnauthorized;
}

export default useUnauthorizedHandler;