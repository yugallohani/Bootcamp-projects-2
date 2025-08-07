import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      content,
      author
    };

    axios.post('http://localhost:5000/posts/add', post)
      .then(res => {
        console.log(res.data);
        navigate('/blog');
      });
  };

  return (
    <div>
      <h1 className="page-title">Create New Post</h1>
      <form onSubmit={onSubmit} className="create-post-form">
        <div className="form-group">
          <label>Title: </label>
          <input type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Post" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
