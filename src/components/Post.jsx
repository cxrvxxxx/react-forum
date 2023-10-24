import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, CircularProgress } from "@mui/material";

import AppContext from '../contexts/AppContext';

import styles from '../styles/Post.module.css';
import ConfirmDeletePost from "./ConfirmDeletePostModal";

const Post = () => {
  const { id } = useParams();

  const { user, posts, fetchPosts, isLoaded, setIsLoaded } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showDeletePostConfirm, setShowDeletePostConfirm] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [forceRender, setForceRender] = useState(false);
  const [rr,setRR] = useState(1)

  const handleForceRender = () => {
    setForceRender(prevForceRender => !prevForceRender);
  };

  const handleDeletePostClick = (e) => {
    setShowDeletePostConfirm(true);
  }

  const handleDeleteConfirm = (e) => {
    axios.post(`http://hyeumine.com/forumDeletePost.php?id=${id}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log(`Deleted post with ID: ${id}`);
          fetchPosts();
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  
  useEffect(() => {
    setPost(posts.filter(item => item.id == id)[0]);
  },[posts])
  useEffect(() => {
    
    fetchPosts();

    // if (!posts) return;

    // setPost(posts.filter(item => item.id == id)[0]);

    // setTimeout(() => setIsLoaded(true), 1000);
  }, [rr]);

  useEffect(() => {
    setComments(post?.reply ? post?.reply : []);
  }, [post])

  useEffect(() => {handleForceRender();}, [comments]);

  return (
    <div className={`${styles.post} container-fluid`}>
      {isLoaded ?
        <div className={`${styles['post-container']} container bg-white px-4 pb-5`}>

          <div className="row py-3 d-flex justify-content-between align-items-center">

            <div className="col-6 d-flex align-items-center">
              <Link to="/posts" style={{ color: "black", fontWeight: "bolder" }}>
                <svg height="32px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </Link>
              <b className="mx-3">Viewing Post</b>
              <ConfirmDeletePost onSubmit={handleDeleteConfirm} show={showDeletePostConfirm} onHide={() => setShowDeletePostConfirm(false)} />
            </div>

            <div className="col-6 d-flex justify-content-end">
              {user?.id == post?.uid && <Button variant="outlined" color="error" onClick={handleDeletePostClick}>
                <div className="d-flex align-items-center">
                  Delete Post
                </div>
              </Button>}
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
          {user && <>
              <div className="row ">
                <div className="col-md-12 px-5 py-3">
                    <input
                      className="col-md-12 form-control"
                      type="text"
                      placeholder="Reply to this post"
                      value={newReply}
                      onChange={e => setNewReply(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          setIsLoaded(false);
                          axios.post(`http://hyeumine.com/forumReplyPost.php`, {
                            user_id: user.id,
                            post_id: post.id,
                            reply: newReply
                          }, {
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            }
                          })
                          .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                              setNewReply('');
                            }
                          })
                          .catch(error => {
                              console.error('There was a problem with the fetch operation:', error);
                          }).finally(()=>{
                            setTimeout(()=>{setRR(Math.random()*1000)},1000);})
                        }
                        // setTimeout(() => {handleForceRender()}, 3000);
                      }}
                    />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12"><hr className="m-0 p-0" /></div>
              </div>
            </>
        }
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
                    <div className="col-md-8 px-4 py-2 d-flex flex-column">
                      <span>{comment?.reply}</span>
                    </div>
                    <div className="col-md-1 px-4 py-2 d-flex flex-column">
                      {user?.id == comment?.uid && <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={e => {
                          axios.post(`http://hyeumine.com/forumDeleteReply.php?id=${comment.id}`,{}, {
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            }
                          })
                          .then(response => {
                              if (!(response.status===200 && response.statusText==="OK")) {
                                  throw new Error('Network response was not ok');
                              }
                              setRR(Math.random()*1000)
                          })
                          .catch(error => {
                              console.error('There was a problem with the fetch operation:', error);
                          })
                          setTimeout(() => {handleForceRender()}, 3000);
                        }}
                        >Delete</Button>}
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