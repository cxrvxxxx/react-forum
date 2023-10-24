import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Modal, Form } from "react-bootstrap";

const ConfirmDeletePost = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    props.onSubmit();
    props.onHide();
    navigate('/posts');
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