import React, { useContext, useState } from "react";
import axios from "axios";

import { Modal, Form } from "react-bootstrap";
import { Button } from "@mui/material";

import AppContext from "../contexts/AppContext";

const NewPostModal = (props) => {
  const [body, setBody] = useState('');
  const { user, fetchPosts } = useContext(AppContext);

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

  const handleSubmit = (e) => {
    axios.post(`http://hyeumine.com/forumNewPost.php`, {
      id: user.id,
      post: body
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!(response.status === 200 && response.statusText === "OK")) {

        }
        fetchPosts();
        props.onHide();
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
            New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicPost">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Start typing.."
              value={body}
              onChange={handleBodyChange}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button className="my-2" variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default NewPostModal;