import React, { useContext, useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { Modal, Form } from "react-bootstrap";

import AppContext from '../contexts/AppContext';

const LoginModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const { setUser, setIsLoaded } = useContext(AppContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsInvalid(false);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsInvalid(false);
  }

  const handleSubmit = (e) => {
    axios.post(`http://hyeumine.com/forumCreateUser.php`, {
      username: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!(response.status === 200 && response.statusText === "OK")) {
          setIsInvalid(true);
        }
        setUser(response.data);
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
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={`${isInvalid ? 'is-invalid' : ''}`}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={`${isInvalid ? 'is-invalid' : ''}`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button className="my-2" variant="contained" color="success" onClick={handleSubmit}>Log in</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default LoginModal;