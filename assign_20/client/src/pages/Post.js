import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-full">
      <h1>{post.title}</h1>
      <p className="post-meta">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      <div>{post.content}</div>
    </div>
  );
};

export default Post;
