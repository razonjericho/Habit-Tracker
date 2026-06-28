import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    function logOut() {
        
        console.log("Logout clicked");
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
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
            <button onClick={logOut} > Log Out </button>
        </header>
    );
}   

export default Header;