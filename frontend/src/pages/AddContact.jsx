import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addcontact.css';
import { useAuth } from '../context/authContext';

const AddContact = () => {
    const [auth] = useAuth();
    const [contact, setContact] = useState({
        user_id: auth?.user_id,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        job: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post('api/v1/contacts', contact);
            if (response.data.success) {
                setMessage(response.data.message);
                setContact({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    company: '',
                    job: '',
                });
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="add-contact">
            <h2>Add Contact</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={contact.first_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={contact.last_name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Company:
                        <input
                            type="text"
                            name="company"
                            value={contact.company}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Job:
                        <input
                            type="text"
                            name="job"
                            value={contact.job}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
