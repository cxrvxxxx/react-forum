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

  const value = {
    posts,
    setPosts,
    isLoaded,
    setIsLoaded,
    user,
    setUser
  }

  useEffect(() => {
    setIsLoaded(false);

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

    setTimeout(() => setIsLoaded(true), 1500);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [pathname]);

  useEffect(() => {
    console.log(user);
  }, [user])


  return (
    <AppContext.Provider value={value}>
      <div className="App">
        <ForumNavbar />

        <div className="app-content">
          {pathname !== '/' && <div className="container d-flex align-items-bottom">
            <small className="breadcrumbs mt-5">Forums {
              (pathname.split("/")).slice(1, pathname.split("/").length).map(path => `➜ ${path}`)
            }</small>
          </div>}

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
