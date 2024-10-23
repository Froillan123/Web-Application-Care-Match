import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index'; // Ensure you have this component
import Login from './Login'; // Adjust the path based on your structure
import Register from './components/Register'; // Assuming you have a Register component
import Newsfeed from './components/Newsfeed'; // Assuming you have a Newsfeed component
import ProtectedRoute from './components/ProtectedRoute'; // Assuming you have a ProtectedRoute component

function App() {
    const [user, setUser] = useState(null); // State to manage the user

    return (
        <Router>
            <Routes>
                {/* Index route */}
                <Route path="/" element={<Index />} />
                
                {/* Login route */}
                <Route path="/login" element={<Login setUser={setUser} />} />
                
                {/* Register route */}
                <Route path="/register" element={<Register />} />
                
                {/* Protected route for newsfeed */}
                <Route 
                    path="/newsfeed" 
                    element={
                        <ProtectedRoute user={user}>
                            <Newsfeed user={user} />
                        </ProtectedRoute>
                    } 
                />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
