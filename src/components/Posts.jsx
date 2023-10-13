import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { CircularProgress, Button } from "@mui/material";
import NewPostModal from './NewPostModal';

import AppContext from '../contexts/AppContext';

import styles from '../styles/Posts.module.css';

const Posts = () => {
  const key = useRef(0);
  const pageSize = 15;

  const { isLoaded, setIsLoaded, user } = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const { posts } = useContext(AppContext);

  const handleNewPostClick = (e) => {
    setShowNewPostModal(true);
  }

  useEffect(() => {
    setIsLoaded(false);

    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  return (
    <div className={`${styles['posts-container']} container-fluid`}>
      <NewPostModal show={showNewPostModal} onHide={() => setShowNewPostModal(false)} />
      <div className={`${styles['posts-content']} container bg-white px-4`}>
        <div className="row d-flex justify-content-end align-items-center">
          <div className="col-md-10">
            <h3>Posts</h3>
          </div>
          <div className="col-md-2">
            {user &&
              <Button variant="contained" color="success" onClick={handleNewPostClick}>
                <div className="container-fluid d-flex justify-content-center align-items-center">
                  <svg height="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>New Post</span>
                </div>
              </Button>
            }
          </div>
        </div>
        {isLoaded ?
          <div className="d-flex flex-column mt-3">
            {(posts.slice(page * pageSize, page * pageSize + pageSize)).map((post, index) => (
              <Link className={`${styles['post-item']}`} key={key.current++} to={`/posts/${post.id}`} >
                <div className={`${styles['post-thumbnail']} container-fluid d-flex flex-column`} key={key.current++}>
                  <span className={`${styles['post-title']}`}>{post?.post ? post?.post : "<untitled>"}</span>
                  <div className="row container-fluid d-flex justify-content-start align-items-center px-0">
                    <small className="col-md-1" key={key.current++}>👤 <i>{post?.user ? post?.user : "Guest"}</i></small>
                    <small className="col-md-2" key={key.current++}>💬 <i>Comments: </i>{post?.reply?.length > 0 ? post?.reply?.length : 0}</small>
                    <small className="col-md-3" key={key.current++}>📅 <i>Date: </i>{post?.date ? post?.date : ""}</small>
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
        <ul className="pagination row d-flex justify-content-between mt-4 px-3">
          <li className="col-md-4 page-item d-flex justify-content-center">
            <button
              className={`${styles['navi-button']} page-link`}
              aria-label="Previous"
              onClick={() => {
                setPage(prev => (prev - 1));
              }}
              disabled={(page <= 0)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          <li className="col-md-4  page-item d-flex justify-content-center align-items-center">
            Page {page + 1} of {Math.ceil(posts.length / pageSize)}
          </li>
          <li className="col-md-4  page-item d-flex justify-content-center">
            <button
              className={`${styles['navi-button']} page-link`}
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