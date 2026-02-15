import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditMedicine() {
    const { id } = useParams();

    // Separate state for time parts
    const [timeParts, setTimeParts] = useState({
        hour: '12',
        minute: '00',
        ampm: 'AM'
    });

    const [formData, setFormData] = useState({
        medicine_name: '',
        dosage: '',
        start_date: '',
        end_date: '',
        message: '',
        is_active: 1
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get_medicines.php?user_id=${userId}`);
                if (Array.isArray(response.data)) {
                    const medicine = response.data.find(m => m.id === id || m.id === parseInt(id));
                    if (medicine) {
                        // Parse 24h time to 12h parts
                        let [h, m] = medicine.reminder_time.split(':');
                        let hourInt = parseInt(h);
                        let ampm = hourInt >= 12 ? 'PM' : 'AM';
                        hourInt = hourInt % 12;
                        hourInt = hourInt ? hourInt : 12;

                        setTimeParts({
                            hour: hourInt.toString().padStart(2, '0'),
                            minute: m,
                            ampm: ampm
                        });

                        setFormData({
                            medicine_name: medicine.medicine_name,
                            dosage: medicine.dosage,
                            start_date: medicine.start_date,
                            end_date: medicine.end_date,
                            message: medicine.message,
                            is_active: medicine.is_active
                        });
                    } else {
                        setError('Medicine not found');
                    }
                }
            } catch (err) {
                setError('Failed to fetch details');
            }
        };

        fetchMedicineDetails();
    }, [id, userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeChange = (e) => {
        setTimeParts({ ...timeParts, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert 12h to 24h for Backend
        let hour = parseInt(timeParts.hour);
        if (timeParts.ampm === 'PM' && hour < 12) hour += 12;
        if (timeParts.ampm === 'AM' && hour === 12) hour = 0;

        const formattedTime = `${hour.toString().padStart(2, '0')}:${timeParts.minute}`;

        try {
            const response = await axios.post('http://localhost:8000/update_medicine.php', {
                id: id,
                ...formData,
                reminder_time: formattedTime
            });

            if (response.data.status === 'success') {
                alert('Medicine updated successfully');
                navigate('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Update failed');
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <div className="form-header">
                    <h2 className="form-title">Edit Medicine</h2>
                </div>
                {error && <div className="alert-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Medicine Name</label>
                        <input
                            type="text"
                            className="form-input"
                            name="medicine_name"
                            value={formData.medicine_name}
                            onChange={handleChange}
                            required
                        />
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
                            />
                        </div>

                        {/* Custom 12H Picker */}
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
                                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
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
                        />
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ flex: 1 }}>Update Medicine</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditMedicine;
