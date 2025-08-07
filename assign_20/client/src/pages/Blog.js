import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div>
      <h1 className="page-title">Blog</h1>
      <div className="blog-list">
        {posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="blog-preview">
              <h2>{post.title}</h2>
              <p>By {post.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
