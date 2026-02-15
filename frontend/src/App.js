import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddMedicine from './pages/AddMedicine';
import EditMedicine from './pages/EditMedicine';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './index.css';
import { useLocation } from 'react-router-dom';

function ConditionalNavbar() {
  const location = useLocation();
  // Hide Navbar on Login (/) and Register (/register) pages
  const hideNavbarPaths = ['/', '/login', '/register'];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-main">
        <ConditionalNavbar />
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />

            {/* Protected Routes */}
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/add-medicine"
              element={isAuthenticated ? <AddMedicine /> : <Navigate to="/" />}
            />
            <Route
              path="/edit-medicine/:id"
              element={isAuthenticated ? <EditMedicine /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
