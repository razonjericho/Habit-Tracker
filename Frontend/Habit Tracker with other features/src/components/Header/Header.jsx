import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';

function Header() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthenticationContext);

    function handleLogout() { 
        logout();
        navigate(`/auth/login`); 
    }


    return (
        <header>
                <h1>Habit Tracker</h1>
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/edit">Edit</Link></li>
                    <li><Link to="/progress">Progress</Link></li>
                </ul>      
            </nav>
            <button onClick={handleLogout} > Log Out </button>
        </header>
    );
}   

export default Header;