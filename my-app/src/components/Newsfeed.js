// src/components/Newsfeed.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Newsfeed = ({ user }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken');
        if (!isAuthenticated) {
            navigate('/'); // Redirect to Index page if not authenticated
        } else {
            fetchUserData();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/userdata', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = (event) => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('authToken'); // Remove the auth token
            navigate('/'); // Navigate to the Index page
        } else {
            event.preventDefault(); // Prevent the logout if not confirmed
        }
    };

    return (
        <div className="newsfeed">
            <style>
                {`
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    html {
                        font-size: 65%;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                        color: #333;
                    }
                    header {
                        background-color: #fff;
                        padding: 0rem 2%;
                        display: flex;
                        alight-items: center;
                        border-bottom: 1px solid #ddd;
                    }
                    nav {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        justify-content: space-between;
                    }
                    .search-bar {
                        margin: 0 20px;
                        display: flex;
                        flex-grow: 1;
                    }
                    .search-bar input {
                        width: 350px; /* Smaller search bar */
                        padding: 5px 15px;
                        border: 1px solid #ccc;
                        border-radius: 2rem;
                        margin-right: 0.8rem;
                        font-size: 1.7rem; /* Adjust font size here */
                    }
                    .search-bar button {
                        background-color: #fff;
                        border: none;
                        padding: 6px 12px;
                        cursor: pointer;
                        color: #008f68;
                        border-radius: 4px;
                        margin-left: 5px;
                        font-size: 2rem;
                    }
                    .menu {
                        display: flex;
                        gap: 5rem;
                        margin-right: 10rem;
                    }
                    
                  .menu button {
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 1.6rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        color: black;
                        position: relative;
                        transition: color 0.4s linear;
                        padding: 10px;
                        overflow: hidden;
                    }

                    .menu button:hover {
                        color: #fafafa;
                        border-radius: 50rem;
                        padding: 1rem;
                    }

                    .menu button::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0; /* Added colon here */
                        width: 100%;
                        height: 100%;
                        background: #0aa45f;
                        z-index: -1;
                        transition: transform 0.4s;
                        transform-origin: 0 0;
                        transition-timing-function: cubic-bezier(0.5, 1.7, 0.4, 1.6);
                        transform: scaleX(0);
                    }

                    .menu button:hover::before {
                        transform: scaleX(1);
                    }
                    .logo img 
                    {
                        height: 70px;
                    }
                    .profile img {
                        height: 65px;
                        border-radius: 50%;
                        margin-right: 2rem;
                    }
                    main 
                    {
                        display: flex;
                        margin: 20px;
                    }
                    .left-panel {
                        width: 25%;
                    }
                    .logout-button
                    {
                        
                        padding: 10px 15px;
                        font-size: 1.5rem;
                        border-radius: 5px;
                        color: #333;
                        background-color: transparent;
                        transition: background-color 0.3s; 
                        cursor: pointer;
                    }
                    .logout-button:hover
                    {
                        background-color: #FF6666;
                    }
                    .user-card {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        text-align: center;
                    }
                    .user-card img {
                        width: 80px;
                        border-radius: 50%;
                    }
                    .user-card h2 {
                        margin: 10px 0;
                    }
                    .user-card a {
                        display: inline-block;
                        margin-top: 10px;
                        color: #008f68;
                        text-decoration: none;
                    }
                    .post {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .main-content {
                        width: 50%;
                        padding: 0 20px;
                    }
                    .posting {
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        padding: 1rem 4%;
                        border-radius: 1rem;
                    }
                    .tabs {
                        display: flex;
                        align-items: center;
                        justify-content: space-evenly;
                        margin-top: 2rem;
                    }
                    .tabs button {
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 16px;
                        margin-right: 20px;
                        gap: 8px;
                        color: green;
                    }
                    .suggestions {
                        margin-top: 20px;
                    }
                    .suggested-card {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                    }
                    .suggested-card img {
                        width: 60px;
                        border-radius: 50%;
                        margin-right: 20px;
                    }
                    .suggested-card button {
                        margin-left: auto;
                        background-color: #008f68;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .right-panel {
                        width: 25%;
                    }
                    .best-rating {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .best-rating ul {
                        list-style-type: none;
                    }
                    .best-rating li {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    .best-rating img {
                        width: 40px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    footer {
                        background-color: #fff;
                        padding: 20px;
                        text-align: center;
                        border-top: 1px solid #ddd;
                        margin-top: 20px;
                    }
                    .footer-menu a {
                        margin: 0 10px;
                        color: #008f68;
                        text-decoration: none;
                    }
                `}
            </style>

            <header>
                <nav className="navigation">
                    <div className="logo">
                        <img className="img" src="/images/png.png" alt=""/>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for caregivers..." />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="menu">
                        <button><i className="fas fa-home"></i> Home</button>
                        <button><i className="fas fa-users"></i> Community</button>
                        <button><i className="fas fa-envelope"></i> Messages</button>
                        <button><i className="fas fa-cog"></i> Settings</button>
                    </div>
                    <div className="profile">
                        <img src="/images/exampleprofile.jpg" alt="Profile" />
                    </div>
                    <div className="logout">
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            </header>

            <main>
            <div className="user-card">
                <img src="/images/exampleprofile.jpg" alt="User Profile" />
                {userData ? (
                    <>
                        <h2>{userData.first_name} {userData.last_name}</h2>
                        <p>Location: {userData.location}</p>
                        <p>{userData.bio}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <button 
                    onClick={() => navigate('/profile')} // Adjust the route as needed
                    style={{ background: 'none', color: '#008f68', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    View Profile
                </button>
            </div>


                <section className="main-content">
                    <div className="posting">
                        <div className="post">
                            <input type="text" placeholder="What's on your mind?" />
                            <button type="submit"><i className="fas fa-paper-plane"></i></button>
                        </div>
                        <div className="tabs">
                            <button><i className="bx bxs-camera"></i> Media</button>
                            <button><i className="bx bxs-file"></i> Articles</button>
                            <button><i className="bx bxs-group"></i> Community</button>
                        </div>
                    </div>
                    <div className="suggestions">
                        <div className="suggested-card">
                            <img src="/images/exampleprofile.jpg" alt="Sarah Brown" />
                            <h3>Sarah Brown</h3>
                            <p>Location: Los Angeles, CA</p>
                            <p>I have over 4 years of experience in caregiving. I’m passionate about helping others and would love to connect!</p>
                            <button>Message Me</button>
                        </div>

                        <div className="suggested-card">
                            <img src="/images/exampleprofile.jpg" alt="Michael Johnson" />
                            <h3>Michael Johnson</h3>
                            <p>Location: Austin, TX</p>
                            <p>With 5 years of experience, I provide compassionate care and support to individuals in need.</p>
                            <button>Message Me</button>
                        </div>
                    </div>
                </section>

                <section className="right-panel">
                    <div className="best-rating">
                        <h3>Top Rated Caregivers</h3>
                        <ul>
                            <li>
                                <img src="/images/exampleprofile.jpg" alt="Sarah Lee" />
                                <span>Sarah Lee - ⭐⭐⭐⭐⭐</span>
                            </li>
                            <li>
                                <img src="/images/exampleprofile.jpg" alt="David Kim" />
                                <span>David Kim - ⭐⭐⭐⭐⭐</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-menu">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Newsfeed;
