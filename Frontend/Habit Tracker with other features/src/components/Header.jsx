import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <h1>Habit Tracker</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/edit">Edit</Link>
            </nav>
        </header>
    );
}   

export default Header;