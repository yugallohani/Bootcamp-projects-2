// Created by Yugal Lohani for Assignment 19 – Profile ID Card using React and DummyJSON
import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

// --- Helper Components for Icons ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);


// --- Reusable Profile Card Component ---
const ProfileCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, age, gender, email, phone, image, company, address } = user;
  const fullName = `${firstName} ${lastName}`;
  const genderIcon = gender === 'male' ? '👨' : '👩';

  return (
    <div className="profile-card">
      <div className="card-gradient-bg"></div>
      <div className="card-content">
        <div className="card-header">
          <div className="profile-image-wrapper">
            <img 
              src={image} 
              alt={fullName} 
              className="profile-image"
              onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/128x128/e2e8f0/4a5568?text=${firstName[0]}`; }}
            />
            <span className="gender-icon" title={gender}>{genderIcon}</span>
          </div>
          <h2 className="profile-name">{fullName}</h2>
          <p className="profile-title">{company.title}</p>
          <p className="profile-age">{age} years old</p>
        </div>
        
        <div className="card-details">
          <div className="detail-item">
            <BriefcaseIcon />
            <div>
              <p className="detail-label">Works at</p>
              <p className="detail-value">{company.name}</p>
            </div>
          </div>
          <div className="detail-item">
            <MailIcon />
             <div>
              <p className="detail-label">Email</p>
              <p className="detail-value">{email}</p>
            </div>
          </div>
          <div className="detail-item">
            <PhoneIcon />
             <div>
              <p className="detail-label">Phone</p>
              <p className="detail-value">{phone}</p>
            </div>
          </div>
          <div className="detail-item">
            <LocationIcon />
             <div>
              <p className="detail-label">Location</p>
              <p className="detail-value">{`${address.city}, ${address.postalCode}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch users:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>Yugal’s Modern Profile Card</h1>
          <p>
            A showcase of modern profile cards built with React and standard CSS, fetching data from a live API.
          </p>
        </header>

        {loading && (
          <div className="loading-indicator">Loading Profiles...</div>
        )}

        {error && (
          <div className="error-message">
            <p>Failed to load data</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <main className="profiles-grid">
            {users.map(user => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
}