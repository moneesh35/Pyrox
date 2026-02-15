import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard({ onLogout }) {
    const [medicines, setMedicines] = useState([]);
    const [sleepTime, setSleepTime] = useState('22:00'); // Default
    const [isEditingSleep, setIsEditingSleep] = useState(false);

    const userName = sessionStorage.getItem('user_name') || 'User';
    const userId = sessionStorage.getItem('user_id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Medicines
                const medResponse = await axios.get(`http://localhost:8000/get_medicines.php?user_id=${userId}`);
                if (Array.isArray(medResponse.data)) {
                    setMedicines(medResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                const response = await axios.post('http://localhost:8000/delete_medicine.php', { id });
                if (response.data.status === 'success') {
                    setMedicines(medicines.filter(med => med.id !== id));
                } else {
                    alert('Failed to delete');
                }
            } catch (error) {
                alert('Error deleting medicine');
            }
        }
    };

    const sendWhatsApp = (medicine) => {
        const message = `Hello ${userName}, it's time to take your medicine: ${medicine.medicine_name} (${medicine.dosage}). ${medicine.message}`;
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
    };

    const handleSaveSleep = async () => {
        try {
            await axios.post('http://localhost:8000/update_settings.php', {
                user_id: userId,
                sleep_time: sleepTime
            });
            alert('Sleep schedule updated!');
            setIsEditingSleep(false);
        } catch (error) {
            alert('Failed to update sleep time');
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hourStr, minute] = timeString.split(':');
        let hour = parseInt(hourStr);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        return `${hour}:${minute} ${ampm}`;
    };

    return (
        <div className="dashboard-container">
            {/* Navbar is in App.js. Content fills the app-container. 
                Removing extra padding/width constraints to align with global navbar. 
            */}
            <div className="dashboard-content">

                {/* Hero Section Style for Dashboard */}
                <div className="hero-section" style={{ padding: '40px 0', marginBottom: '20px' }}>
                    <div className="hero-content">
                        <h1 className="hero-title" style={{ color: 'white', fontSize: '2.5rem' }}>Start your Day, {userName}</h1>
                        <p className="hero-subtitle" style={{ marginBottom: 0 }}>Manage your health and reminders.</p>
                    </div>
                </div>

                {/* Action Tiles Section */}
                <div className="action-grid" style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '40px',
                    flexWrap: 'wrap'
                }}>
                    {/* Sleep Schedule Tile */}
                    <div className="action-card" style={{
                        flex: '1 1 300px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '25px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ fontSize: '2.5rem' }}>🌙</div>
                        <div>
                            <h3 style={{ margin: '0 0 5px 0', color: '#fff' }}>Sleep Schedule</h3>
                            {isEditingSleep ? (
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input
                                        type="time"
                                        value={sleepTime}
                                        onChange={(e) => setSleepTime(e.target.value)}
                                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
                                    />
                                    <button onClick={handleSaveSleep} className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>Save</button>
                                </div>
                            ) : (
                                <div onClick={() => setIsEditingSleep(true)} style={{ cursor: 'pointer', color: '#90e0ef', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {formatTime(sleepTime)} <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>✎ Edit</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add Medicine Tile */}
                    <Link to="/add-medicine" className="action-card" style={{
                        flex: '1 1 300px',
                        background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(0, 119, 182, 0.2))',
                        backdropFilter: 'blur(10px)',
                        padding: '25px',
                        borderRadius: '20px',
                        border: '1px solid rgba(0, 180, 216, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        textDecoration: 'none',
                        color: '#fff',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{ fontSize: '2.5rem' }}>💊</div>
                        <div>
                            <h3 style={{ margin: '0 0 5px 0' }}>Add Medicine</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Schedule a new reminder</p>
                        </div>
                    </Link>
                </div>

                <div className="medicine-grid">
                    {medicines.length === 0 ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#666' }}>
                            <p>No medicines found.</p>
                            <Link to="/add-medicine" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', color: 'white' }}>Add Your First Medicine</Link>
                        </div>
                    ) : (
                        medicines.map((med) => (
                            <div key={med.id} className="medicine-card">
                                <div className="medicine-header">
                                    <span className="medicine-name">{med.medicine_name}</span>
                                    <span className="medicine-dosage">{med.dosage}</span>
                                </div>
                                <div className="medicine-time">
                                    ⏰ {formatTime(med.reminder_time)}
                                </div>
                                <div className="medicine-dates">
                                    <span>Start: {med.start_date}</span>
                                    <span>End: {med.end_date}</span>
                                </div>
                                <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '15px' }}>"{med.message}"</p>

                                <div className="card-actions">
                                    <button onClick={() => sendWhatsApp(med)} className="btn-edit" style={{ background: '#25D366', color: 'white' }}>WhatsApp</button>
                                    <Link to={`/edit-medicine/${med.id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(med.id)} className="btn-delete">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
