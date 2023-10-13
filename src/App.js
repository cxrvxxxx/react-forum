import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import ForumNavbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';

import AppContext from './contexts/AppContext';

import './styles/App.css';

function App() {
  const { pathname } = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);

  const value = {
    isLoaded,
    setIsLoaded
  }

  useEffect(() => {
    console.log(pathname);
  }, [pathname])

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
