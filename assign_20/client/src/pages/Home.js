import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="page-title">Welcome to My Blog</h1>
      <p style={{textAlign: 'center', marginBottom: '2rem'}}>
        This is a place where I share my thoughts on technology, programming, and life.
      </p>
      <div style={{textAlign: 'center'}}>
        <Link to="/blog" className="btn">Explore Blog</Link>
      </div>
    </div>
  );
};

export default Home;