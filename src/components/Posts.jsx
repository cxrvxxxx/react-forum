import React, { useContext, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Post from './Post';

import AppContext from '../contexts/AppContext';

import styles from '../styles/Posts.module.css';
import { Link } from "react-router-dom";

const Posts = () => {
  const key = useRef(0);
  const { posts } = useContext(AppContext);

  return (
    <div className={`${styles['posts-container']} container-fluid`}>
      <div className={`${styles['posts-content']} container bg-white`}>
        <h3>Posts</h3>
        <div className="d-flex flex-column">
          {posts.map((post, index) => (
            <Link className={`${styles['post-item']}`} key={key.current++} to={`/posts/${post.id}`} >
              <div className={`${styles['post-thumbnail']} container-fluid d-flex flex-column`} key={key.current++}>
                <span className={`${styles['post-title']}`}>{post.title}</span>
                <small key={key.current++}>Author: <i>User#{post.userId}</i></small>
              </div>
              {index < posts.length - 1 && <hr className="my-1" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;