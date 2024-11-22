import React, { useState } from 'react';
import '../styles/modal.css';

const EditContactModal = ({ contact, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...contact });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Ensure the latest state is used for saving
        onSave({ ...formData });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Edit Contact</h3>
                <form>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Job:</label>
                        <input
                            type="text"
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;
