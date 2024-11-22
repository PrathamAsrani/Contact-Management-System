import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post(`api/v1/signup`, formData);
            if(data.success === true){
                toast.success(data?.message);
                navigate("/")
            }
            else{
                toast.error('Error in registration');
            }
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <div className="signup-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
