import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import ForumNavbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';

import AppContext from './contexts/AppContext';

import './styles/App.css';

function App() {
  let intervalId;
  const { pathname } = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://hyeumine.com/forumGetPosts.php");

      if (response.status === 200) {
        setPosts(response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        }));
      }
    } catch (error) {

    }
  }

  const pathToList = () => {
    /* Splits the full URL */
    return pathname.split("/")
      .slice(
        1,
        pathname.split("/").length
      )
  }

  useEffect(() => {
    /* Interval set to update posts */
    intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);

    /* Clear the interval on dismount */
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /* Exposing to context provider */
  const value = {
    posts,
    setPosts,
    isLoaded,
    setIsLoaded,
    user,
    setUser,
    fetchPosts
  }


  return (
    <AppContext.Provider value={value}>
      <div className="App">
        {/* Render Navbar */}
        <ForumNavbar />

        <div className="app-content">

          {/* Render Breadcrumb */}
          {pathname !== '/' &&
            <div className="container d-flex align-items-bottom">
              <small className="breadcrumbs mt-5">Forums {pathToList().map(path => `➜ ${path}`)}</small>
            </div>
          }

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>

        </div>

      </div>
    </AppContext.Provider>
  );
}

export default App;
