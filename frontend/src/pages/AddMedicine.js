import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

function AddMedicine() {
    // Separate state for time parts
    const [timeParts, setTimeParts] = useState({
        hour: '08',
        minute: '00',
        ampm: 'AM'
    });

    const [formData, setFormData] = useState({
        medicine_name: '',
        dosage: '',
        start_date: '',
        end_date: '',
        message: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userId = sessionStorage.getItem('user_id');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeChange = (e) => {
        setTimeParts({ ...timeParts, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e, redirect = true) => {
        e.preventDefault();
        if (!userId) {
            setError('User not authenticated');
            return;
        }

        // Convert 12h to 24h for Backend
        let hour = parseInt(timeParts.hour);
        if (timeParts.ampm === 'PM' && hour < 12) hour += 12;
        if (timeParts.ampm === 'AM' && hour === 12) hour = 0;

        const formattedTime = `${hour.toString().padStart(2, '0')}:${timeParts.minute}`;

        try {
            const response = await api.post('/add_medicine.php', {
                user_id: userId,
                ...formData,
                reminder_time: formattedTime
            });

            if (response.data.status === 'success') {
                alert('Medicine added successfully');
                if (redirect) {
                    navigate('/dashboard');
                } else {
                    // Reset
                    setFormData({
                        medicine_name: '',
                        dosage: '',
                        start_date: '',
                        end_date: '',
                        message: ''
                    });
                    setTimeParts({
                        hour: '08',
                        minute: '00',
                        ampm: 'AM'
                    });
                }
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Failed to add medicine');
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <div className="form-header">
                    <h2 className="form-title">Add New Medicine</h2>
                </div>
                {error && <div className="alert-error">{error}</div>}

                <form>
                    <div className="form-group">
                        <label className="form-label">Medicine Name</label>
                        <input
                            type="text"
                            className="form-input"
                            name="medicine_name"
                            value={formData.medicine_name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Paracetamol"
                            list="medicine-list"
                        />
                        <datalist id="medicine-list">
                            <option value="Paracetamol" />
                            <option value="Dolo 650" />
                            <option value="Azithromycin" />
                            <option value="Metformin" />
                            <option value="Amoxicillin" />
                            <option value="Pantoprazole" />
                            <option value="Ibuprofen" />
                            <option value="Cetirizine" />
                            <option value="Aspirin" />
                            <option value="Ranitidine" />
                        </datalist>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Dosage</label>
                            <input
                                type="text"
                                className="form-input"
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 500mg"
                            />
                        </div>

                        {/* Custom 12H Time Picker */}
                        <div className="form-group">
                            <label className="form-label">Reminder Time</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select
                                    className="form-input"
                                    name="hour"
                                    value={timeParts.hour}
                                    onChange={handleTimeChange}
                                    style={{ flex: 1 }}
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                        <option key={h} value={h.toString().padStart(2, '0')}>{h}</option>
                                    ))}
                                </select>
                                <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>:</span>
                                <select
                                    className="form-input"
                                    name="minute"
                                    value={timeParts.minute}
                                    onChange={handleTimeChange}
                                    style={{ flex: 1 }}
                                >
                                    {/* Generate Minutes (00 to 59) */}
                                    {(() => {
                                        const minutes = [];
                                        for (let i = 0; i < 60; i++) {
                                            minutes.push(i < 10 ? `0${i}` : `${i}`);
                                        }
                                        return minutes.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ));
                                    })()}
                                </select>
                                <select
                                    className="form-input"
                                    name="ampm"
                                    value={timeParts.ampm}
                                    onChange={handleTimeChange}
                                    style={{ flex: 1 }}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-input"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-input"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Custom Message</label>
                        <input
                            type="text"
                            className="form-input"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="e.g. Take after food"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={(e) => handleSubmit(e, false)} className="btn-secondary" style={{ flex: 1, background: '#e0f7fa', color: '#006064' }}>
                            Save & Add Another
                        </button>
                        <button type="button" onClick={(e) => handleSubmit(e, true)} className="btn-primary" style={{ flex: 1 }}>
                            Save Medicine
                        </button>
                    </div>
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <Link to="/dashboard" style={{ color: '#666', textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMedicine;
