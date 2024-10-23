import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

function Login({ setUser }) {
    console.log("setUser prop:", setUser); // Log the prop to confirm it's a function

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { username, password };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log("Login response:", data); // Log the server response

            if (response.ok) {
                localStorage.setItem('authToken', data.token); // Store the auth token
                if (typeof setUser === 'function') {
                    setUser(data.user); // Set the user state
                } else {
                    console.error("setUser is not a function");
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                }).then(() => {
                    setUsername('');
                    setPassword('');
                    navigate('/newsfeed'); // Navigate to the newsfeed
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message,
                }).then(() => {
                    setUsername('');
                    setPassword('');
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Please try again later.',
            }).then(() => {
                setUsername('');
                setPassword('');
            });
        }
    };

    return (
        <div>
            <div className="Login">
                <h1>Welcome</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <br />
                    <button id="submit" className="submit" type="submit">Login</button>
                </form>

                <p className="register" style={{ fontSize: '12px' }}>
                    Don't have an account? 
                    <Link to="/register">
                        <span style={{ color: '#0aa45f', fontSize: '14px', textDecoration: 'underline', marginLeft: '10px' }}>
                            Create one here.
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
