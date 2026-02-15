import React from 'react';
import { Link } from 'react-router-dom';
// Navbar is now in App.js

function Home() {
    const isAuthenticated = !!localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name') || 'Friend';

    return (
        <div className="home-container">
            {/* Hero Section - Restored Design but no Buttons */}
            <header className="hero-section">
                <div className="hero-content">
                    {isAuthenticated ? (
                        <>
                            <h1 className="hero-title" style={{ color: 'white' }}>Welcome back, {userName}.</h1>
                            <p className="hero-subtitle">
                                Your health dashboard is ready. Check your upcoming reminders and manage your schedule.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="hero-title">Never Miss a Dose Again.</h1>
                            <p className="hero-subtitle">
                                Your personal health companion. Schedule reminders, track your history, and stay healthy with MedAlert.
                            </p>
                        </>
                    )}

                    {/* BUTTONS REMOVED AS REQUESTED */}
                </div>

                <div className="hero-visual">
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="glass-card-mockup">
                        <div className="mockup-header">MedAlert App</div>
                        <div className="mockup-row">💊 Vitamin C - 8:00 AM</div>
                        <div className="mockup-row">💓 Heart Med - 2:00 PM</div>
                        <div className="mockup-row">🌙 Sleep Aid - 10:00 PM</div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">⏰</div>
                    <h3>Smart Reminders</h3>
                    <p>Get instant WhatsApp & SMS notifications exactly when you need to take your medicine.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📅</div>
                    <h3>Track History</h3>
                    <p>Keep a detailed record of your medication schedule and adherence.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your health data is encrypted and stored securely. Only you have access.</p>
                </div>
            </section>

            <footer className="footer" style={{ marginTop: '100px', textAlign: 'center', padding: '20px', color: '#888', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p>&copy; 2026 MedAlert. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
