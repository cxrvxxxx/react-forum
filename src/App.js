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
  const { pathname } = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const fetchPosts = () => {
    axios.get("http://hyeumine.com/forumGetPosts.php")
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          }));
        }
      })
      .catch(error => {

      })
  }

  const pathToList = () => {
    return pathname.split("/")
      .slice(
        1,
        pathname.split("/").length
      )
  }

  useEffect(() => {
    setIsLoaded(false);

    fetchPosts();

    setTimeout(() => setIsLoaded(true), 1500);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [pathname]);

  useEffect(() => {
    console.log(user);
  }, [user])

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
