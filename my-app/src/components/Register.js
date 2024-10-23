import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Register.css'; // Import your CSS file for styling

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        birthday: '',
        maritalStatus: 'Single',
        address: '',
        contactInfo: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the error for the current field
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                if (value.trim() === '') {
                    error = 'Username is required';
                }
                break;
            case 'password':
                if (value.length < 8 || value.length > 25) {
                    error = 'Password must be 8-25 characters long';
                }
                break;
            case 'firstName':
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'First Name can only contain letters and spaces';
                }
                break;
            case 'lastName':
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Last Name can only contain letters and spaces';
                }
                break;
            case 'email':
                if (value.trim() === '') {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@(gmail\.com|yahoo\.com|[^\s@]+\.net)$/.test(value)) {
                    error = 'Email must end with @gmail.com, @yahoo.com, or .net';
                }
                break;
            case 'birthday':
                if (!value) {
                    error = 'Birthday is required';
                }
                break;
            case 'address':
                if (value.trim() === '') {
                    error = 'Address is required';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors({
                ...errors,
                [name]: error,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message === 'Username already exists') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already exists!',
                    });
                } else if (errorData.message === 'Email already exists') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already exists!',
                    });
                } else {
                    throw new Error('An unexpected error occurred');
                }
                return;
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Registered Successfully!',
            }).then(() => {
                setFormData({
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    birthday: '',
                    maritalStatus: 'Single',
                    address: '',
                    contactInfo: '',
                    email: '',
                });
                navigate('/login');
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    return (
        <div>
            <div className="container">
                <div className="box">
                    <h1>Register</h1>
                    <div className="logo">
                        <img src={`${process.env.PUBLIC_URL}/images/png.png`} alt="" width="75" height="auto" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder={errors.username || "Username"}
                                required
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.username ? 'red' : undefined }}
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder={errors.password || "Password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.password ? 'red' : undefined }}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder={errors.firstName || "First Name"}
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.firstName ? 'red' : undefined }}
                            />
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder={errors.lastName || "Last Name"}
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.lastName ? 'red' : undefined }}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="date"
                                name="birthday"
                                placeholder={errors.birthday || "Birthday"}
                                value={formData.birthday}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                style={{ borderColor: errors.birthday ? 'red' : undefined }}
                            />
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                            >
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder={errors.address || "Address"}
                                required
                                value={formData.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.address ? 'red' : undefined }}
                            />
                            <input
                                type="text"
                                name="contactInfo"
                                placeholder="Contact Info"
                                value={formData.contactInfo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={errors.email || "Email"}
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.email ? 'red' : undefined }}
                            />
                        </div>
                        <input type="submit" value="Register" className="btn" id="submit" />
                    </form>
                    <p>Already have an account? 
                        <Link to="/login">
                            <span style={{ color: '#0aa45f', fontSize: '14px', textDecoration: 'underline', marginLeft: '10px' }}>Login here.</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
