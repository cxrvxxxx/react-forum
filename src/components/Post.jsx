import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import AppContext from '../contexts/AppContext';

import styles from '../styles/Post.module.css';

const Post = () => {
  const { id } = useParams();

  const { isLoaded, setIsLoaded } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!id) return;

    setIsLoaded(false);

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        if (response.status === 200) {
          setPost(response.data);
        }
      })
      .catch(error => {

      });
  }, []);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${post?.userId}`)
      .then(response => {
        if (response.status === 200) {
          setAuthor(response.data);
        }
      })
      .catch(error => {

      });

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        if (response.status === 200) {
          setComments(response.data);
        }
      })
      .catch(error => {

      });

    setTimeout(() => setIsLoaded(true), 1500);
  }, [post]);

  return (
    <div className={`${styles.post} container-fluid`}>
      {isLoaded ?
        <div className={`${styles['post-container']} container bg-white px-4 pb-5`}>
          <div className="row">
            <div className="col-md-12 px-5 my-3">
              Viewing Post: <b>{post?.title}</b>
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
                  <h5 className="my-0"><b>{author?.username}</b></h5>
                  <small>{author?.email}</small>
                </span>
              </span>
            </div>
            <div className="col-md-9 py-2">
              {post?.body}
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
              {comments.map(comment =>
                <>
                  <div className="row">
                    <div className="col-md-3">
                      <div className={`${styles['reply-user']} h-100 px-3`}>
                        <span className="d-flex justify-content-end pt-2">{comment?.email}</span>
                      </div>
                    </div>
                    <div className="col-md-9 py-2 d-flex flex-column">
                      <span><b>{comment?.name}</b></span>
                      <span className="mt-3">{comment?.body}</span>
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