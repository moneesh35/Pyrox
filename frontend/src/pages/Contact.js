import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className="home-container">
            {/* Reuse Navbar (Should ideally be a Layout component) */}
            <nav className="navbar">
                <div className="logo">MedAlert</div>
                <div className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/contact" className="nav-item">Contact</Link>
                    <Link to="/login" className="nav-item btn-login">Login</Link>
                </div>
            </nav>

            <div className="contact-wrapper">
                <div className="contact-card">
                    <h2>Contact Us</h2>
                    <p>Have questions or need support? Reach out to us!</p>

                    {submitted ? (
                        <div className="success-message">
                            <h3>Thank you!</h3>
                            <p>We have received your message and will get back to you shortly.</p>
                            <button onClick={() => setSubmitted(false)} className="btn-secondary">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-input" required placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" required placeholder="your@email.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea className="form-input" rows="5" required placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
