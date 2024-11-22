import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/homepage.css'
import { toast } from 'react-toastify';

const HomePage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth();

    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`api/v1/login`, { email, password });
            if (data?.success == true) {
                setAuth({
                    ...auth,
                    user_id: data?.user_id
                })
                toast.success(data?.message)
                localStorage.setItem('auth', JSON.stringify(data?.user_id));
                navigate('/dashboard');
            }
            else {
                toast.error('User not found!')
                navigate('/signup')
            }
        }
        catch (err) {
            console.error(err);
            toast.error(err);
        }
    }
    return (
        <div>
            <div id="webpage">
                <div className="homepage-left">
                    <h1>Contact Management System</h1>
                    <h3>SDE Intern assignment by erino</h3>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/pratham-asrani-9897b0225/" target='_blank' ><FaLinkedin className='icon' /></a>
                        <a href="mailto:prathamasrani.cs@gmail.com" target='_blank' ><FaEnvelope className='icon' /></a>
                    </div>
                </div>
                <div className="homepage-right">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' required />
                        </div>
                        <div className="button-group">
                            <button type="submit">Sign In</button>
                            <button type="button" onClick={handleSignUp}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage
