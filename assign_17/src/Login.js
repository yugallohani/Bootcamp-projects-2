// Created by Yugal Lohani for Assignment 16 – React Login & Signup Page
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handles input changes and updates state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validates the form data
  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login data submitted:', formData);
      alert('Login successful!');
      // Here you would typically handle the login logic (e.g., API call)
      // For this example, we'll just navigate to a placeholder dashboard
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Log In
        </button>
      </form>
      <p className="auth-switch-link">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
