import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './LoginModal';
import { Button } from '@mui/material';
import { NavDropdown } from 'react-bootstrap';

import AppContext from '../contexts/AppContext';

const ForumNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, setUser } = useContext(AppContext);

  const handleLoginClick = (e) => {
    setShowLoginModal(true);
  }

  const handleLogout = (e) => {
    setUser(null);
  }

  return (
    <Navbar expand="lg" className="navi bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">💬 Forum</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/posts" className="nav-link">Posts</Link>
          </Nav>
          {!user ?
            <Nav>
              <Button variant="contained" color="success" onClick={handleLoginClick}>Login</Button>
            </Nav>
            :
            <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          }
        </Navbar.Collapse>
      </Container>

      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </Navbar>
  );
}

export default ForumNavbar;