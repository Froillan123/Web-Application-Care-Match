// src/Index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing from 'react-dom/client' for React 18
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index'; // Your Index component
import Login from './components/Login'; // Your Login component
import Register from './components/Register'; // Your Register component
import Newsfeed from './components/Newsfeed'; // Import your Newsfeed component

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/newsfeed" element={<Newsfeed />} /> {/* Add this line */}
      {/* Add more routes as necessary */}
    </Routes>
  </BrowserRouter>
);
