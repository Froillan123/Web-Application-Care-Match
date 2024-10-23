import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/userdata', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust if your token is stored differently
                    }
                });

                // Check if the response is ok
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error fetching user data:', errorData);
                    throw new Error(errorData.message || 'Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data); // Set the user data if fetch is successful
            } catch (error) {
                console.error('Error fetching user data:', error); // Log error
            }
        };

        fetchUserData();
    }, []); // Run this effect once on component mount

    return (
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
    );
};

export default UserCard;
