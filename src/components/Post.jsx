import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import AppContext from '../contexts/AppContext';

import styles from '../styles/Post.module.css';

const Post = () => {
  const { id } = useParams();

  const { isLoaded, setIsLoaded } = useContext(AppContext);
  const { posts } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!posts) return;

    setPost(posts.filter(item => item.id == id)[0]);

    setTimeout(() => setIsLoaded(true), 1000);
  }, []);



  useEffect(() => {
    setComments(post?.reply ? post?.reply : []);
  }, [comments])

  return (
    <div className={`${styles.post} container-fluid`}>
      {isLoaded ?
        <div className={`${styles['post-container']} container bg-white px-4 pb-5`}>
          <div className="row">
            <div className="col-md-12 my-3 d-flex align-items-center">
              <Link to="/posts" style={{ color: "black", fontWeight: "bolder" }}>
                <svg height="32px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </Link>
              <b className="mx-3">Viewing Post</b>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12"><hr className="m-0 p-0" /></div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <span className={`${styles['user-display']} d-flex justify-content-center align-items-center flex-column p-3`}>
                <div className={`${styles.avatar}`}>👤</div>
                <span className="d-flex flex-column justify-content-center align-items-center mt-2">
                  <h5 className="my-0"><b>{post?.user}</b></h5>
                </span>
              </span>
            </div>
            <div className="col-md-9 py-2 px-4">
              {post?.post}
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12"><hr className="m-0 p-0" /></div>
          </div>
          {comments.length > 0 &&
            <>
              <div className="row">
                <div className="col-md-12 px-5 my-1">
                  <b><i>Replies</i></b>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12"><hr className="m-0 p-0" /></div>
              </div>
              {post?.reply.map(comment =>
                <>
                  <div className="row">
                    <div className="col-md-3">
                      <div className={`${styles['reply-user']} h-100 px-3`}>
                        <span className="d-flex justify-content-center pt-2">({comment?.date}) {comment?.user}</span>
                      </div>
                    </div>
                    <div className="col-md-9 px-4 py-2 d-flex flex-column">
                      <span>{comment?.reply}</span>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12"><hr className="m-0 p-0" /></div>
                  </div>
                </>
              )}
            </>
          }
          <div className="row ">
            <div className="col-md-12"><hr className="m-0 p-0" /></div>
          </div>
        </div>
        :
        <div className={`${styles.post} container-fluid`}>
          <div className={`${styles['post-container']} container bg-white d-flex justify-content-center align-items-center p-5`}>
            <CircularProgress />
          </div>
        </div>
      }
    </div >
  );
}

export default Post;