import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';

import ForumNavbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';

import AppContext from './contexts/AppContext';

import './styles/App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  const value = {
    isLoaded
  }

  return (
    <AppContext.Provider value={value}>
      <div className="App">
        <ForumNavbar />

        {pathname !== '/' && <div className="container d-flex align-items-bottom">
          <small className="breadcrumbs mt-5">Forums{pathname}</small>
        </div>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
