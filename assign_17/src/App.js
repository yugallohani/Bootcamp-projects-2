// Created by Yugal Lohani for Assignment 16 – React Login & Signup Page
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './signup';
import './App.css';

// A placeholder for a logged-in view
const Dashboard = () => (
  <div style={{ textAlign: 'center', color: 'white', fontSize: '2rem', marginTop: '5rem' }}>
    <h1>Welcome to the Dashboard!</h1>
    <p>You have successfully logged in.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
