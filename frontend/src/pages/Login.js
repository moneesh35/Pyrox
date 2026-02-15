import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Using the centralized API instance
            const response = await api.post('/login.php', {
                phone,
                password
            });

            if (response.data.status === 'success') {
                sessionStorage.setItem('user_id', response.data.user_id);
                sessionStorage.setItem('user_name', response.data.user_name);
                sessionStorage.setItem('user_email', response.data.email);
                onLogin();
                navigate('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Welcome Back</h2>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Login</button>
            </form>
            <div className="auth-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
}

export default Login;
