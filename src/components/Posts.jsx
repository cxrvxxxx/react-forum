import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import AppContext from '../contexts/AppContext';

import styles from '../styles/Posts.module.css';

const Posts = () => {
  const key = useRef(0);
  const pageSize = 15;

  const { isLoaded, setIsLoaded } = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  const getPosts = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      })
      .catch(error => {

      })
  }

  const getUsers = () => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch(error => {

      })
  }

  const getComments = () => {
    axios.get("https://jsonplaceholder.typicode.com/comments")
      .then(response => {
        if (response.status === 200) {
          setComments(response.data);
        }
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    setIsLoaded(false);

    getPosts();
    getUsers();
    getComments();

    setTimeout(() => setIsLoaded(true), 1500);
  }, []);

  return (
    <div className={`${styles['posts-container']} container-fluid`}>
      <div className={`${styles['posts-content']} container bg-white px-4`}>
        <h3>Posts</h3>
        {isLoaded ?
          <div className="d-flex flex-column mt-3">
            {(posts.slice(page * pageSize, page * pageSize + pageSize)).map((post, index) => (
              <Link className={`${styles['post-item']}`} key={key.current++} to={`/posts/${post.id}`} >
                <div className={`${styles['post-thumbnail']} container-fluid d-flex flex-column`} key={key.current++}>
                  <span className={`${styles['post-title']}`}>{post.title}</span>
                  <div className="container-fluid d-flex justify-content-between align-items-center px-0">
                    <small className="mx-0" key={key.current++}>👤 <i>{(users.find(user => user.id === post.userId)).username}</i></small>
                    <small className="mx-3" key={key.current++}><i>Comments: </i>{[comments.filter(comment => comment.postId === post.id)].length} 💬 </small>
                  </div>
                </div>
                {index < posts.length - 1 && <hr className="my-1" />}
              </Link>
            ))}
          </div>
          :
          <div className="container-fluid d-flex justify-content-center align-items-center p-5">
            <CircularProgress />
          </div>
        }
        <ul className="pagination d-flex justify-content-between mt-4 px-3">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => {
                setPage(prev => (prev - 1));
              }}
              disabled={(page <= 0)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          <li className="page-item d-flex justify-content-center align-items-center">
            Page {page + 1} out of {Math.ceil(posts.length / pageSize)}
          </li>
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => {
                setPage(prev => (prev + 1));
              }}
              disabled={page >= posts.length / pageSize - 1}>
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Posts;