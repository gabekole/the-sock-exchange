import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSock = () => {
    const initialFormData = {
        userId: '',
        sockDetails: {
            size: 'Small',
            color: '',
            pattern: '',
            material: '',
            condition: 'New',
            forFoot: 'Left',
        },
        additionalFeatures: {
            waterResistant: false,
            padded: false,
            antiBacterial: false,
        },
        addedTimestamp: new Date().toISOString(),
    };

    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                additionalFeatures: {
                    ...prevData.additionalFeatures,
                    [name]: checked,
                },
            }));
        } else if (name in formData.sockDetails) {
            setFormData((prevData) => ({
                ...prevData,
                sockDetails: {
                    ...prevData.sockDetails,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/api/socks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Sock added:', data);

            // Show success popup
            alert('Sock added successfully!');

            // Reset form fields
            setFormData(initialFormData);

            // Redirect to home page after successful submission
            navigate('/');
        } catch (error) {
            console.error('Error adding sock:', error);
        }
    };

    return (
        <form className="p-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="size">Size</label>
                <select
                    className="form-control"
                    id="size"
                    name="size"
                    value={formData.sockDetails.size}
                    onChange={handleChange}
                >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    value={formData.sockDetails.color}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pattern">Pattern</label>
                <input
                    type="text"
                    className="form-control"
                    id="pattern"
                    name="pattern"
                    value={formData.sockDetails.pattern}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="material">Material</label>
                <input
                    type="text"
                    className="form-control"
                    id="material"
                    name="material"
                    value={formData.sockDetails.material}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                    className="form-control"
                    id="condition"
                    name="condition"
                    value={formData.sockDetails.condition}
                    onChange={handleChange}
                >
                    <option>Used</option>
                    <option>New</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="forFoot">For Foot</label>
                <select
                    className="form-control"
                    id="forFoot"
                    name="forFoot"
                    value={formData.sockDetails.forFoot}
                    onChange={handleChange}
                >
                    <option>Left</option>
                    <option>Right</option>
                    <option>Both</option>
                </select>
            </div>
            <div className="row">
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="waterResistant"
                        name="waterResistant"
                        checked={formData.additionalFeatures.waterResistant}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="waterResistant">
                        Water Resistant
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="padded"
                        name="padded"
                        checked={formData.additionalFeatures.padded}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="padded">
                        Padded
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="antiBacterial"
                        name="antiBacterial"
                        checked={formData.additionalFeatures.antiBacterial}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="antiBacterial">
                        Anti Bacterial
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default AddSock;
