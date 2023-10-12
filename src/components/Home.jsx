import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={`${styles.home} container-fluid`}>
      <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
        <h1 className={`${styles['text']}`}>Welcome to The Forums!</h1>
        <Link to="/posts">
          <Button className="mt-4" variant="contained">View Posts</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;