import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting registration...");
        try {
            // Using the centralized API instance
            const response = await api.post('/register.php', {
                name,
                email,
                phone,
                password
            });
            console.log("Response:", response.data);

            if (response.data.status === 'success') {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                alert('Error: ' + response.data.message);
                setError(response.data.message);
            }
        } catch (err) {
            console.error("Registration Error:", err);
            alert('Registration failed. Check console for details.');
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Create Account</h2>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="btn-primary">Register</button>
            </form>
            <div className="auth-link">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
    );
}

export default Register;
