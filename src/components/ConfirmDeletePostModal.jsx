import React, { useContext } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { Modal, Form } from "react-bootstrap";

import AppContext from '../contexts/AppContext';

const ConfirmDeletePost = (props) => {
  const { fetchPosts } = useContext(AppContext);

  const handleSubmit = (e) => {
    axios.post(`http://hyeumine.com/forumDeletePost.php?id=${props.postId}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!(response.status === 200 && response.statusText === "OK")) {
          throw new Error('Network response was not ok');
        }
        props.onHide();
        fetchPosts();
        // TODO: Redirect user to '/posts'
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <Form>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure? (This action cannot be undone.)</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button className="my-2" variant="contained" color="error" onClick={handleSubmit}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default ConfirmDeletePost;