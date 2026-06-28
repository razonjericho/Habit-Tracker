import React from 'react';

function SessionExpiredModal({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <div>
            <h2>Session Expired</h2>
            <p>Your session has already expired. Please log in again</p>
            <button onClick={onClose} >OK</button>
        </div>
    )
}

export default SessionExpiredModal;