import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Welcome from '../components/Welcome';
import Quotes from '../components/Quotes';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import Report from '../components/Report';
import Profile from '../components/Profile';
import Tags from '../components/Tags';

function AppRouter() {
  const isLoggedIn = useSelector(state => state.user.email !== '');

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/Quotes" /> : <Navigate to="/Welcome" />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Quotes" element={<Quotes />} />
        <Route path="/Home" element={<HomePage />}/>
        <Route path="/Reports" element={<Report />}/>
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/Tags" element={<Tags />}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
