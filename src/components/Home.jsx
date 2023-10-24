import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={`${styles.home} container-fluid`}>
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <span className={`${styles['text']}`}>Welcome to The Forums!</span>
          </div>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <Link to="/posts">
              <Button size="large" className="mt-4" variant="contained">View Posts</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;