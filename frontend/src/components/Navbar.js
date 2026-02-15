import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!sessionStorage.getItem('user_id');

    const handleLogout = () => {
        sessionStorage.clear();
        // Force reload or state update to reflect logout immediately if App.js doesn't catch it
        window.location.href = '/login';
    };

    // Don't show navbar on login/register pages if desired, but user asked for "Home button ... when u come back from any page"
    // So we keep it everywhere, or maybe simplify it on auth pages.
    // User said: "add a new button in nav bar medicine to add the medicine"

    return (
        <nav className="navbar">
            <div className="logo">MedAlert</div>
            <div className="nav-links">
                <Link to="/" className="nav-item">Home</Link>

                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="nav-item">My Medicines</Link>
                        <Link to="/add-medicine" className="nav-item btn-nav-add" style={{ color: 'white', textDecoration: 'none' }}>+ Add Medicine</Link>
                        <button onClick={handleLogout} className="nav-item btn-login" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/contact" className="nav-item">Contact</Link>
                        <Link to="/login" className="nav-item btn-login">Login</Link>
                        <Link to="/register" className="nav-item btn-register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
