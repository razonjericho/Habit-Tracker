import React from 'react'
import { Link } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
    return (
            <nav className="bottom-nav">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/edit" className="nav-item">Edit</Link>   
            </nav>
    )
}

export default BottomNav;