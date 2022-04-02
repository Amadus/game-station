import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import Sell from './components/Sell/Sell';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/games' exact element={<Games />} />
          <Route path='/sell' exact element={<Sell />} />
          <Route path='/profile' exact element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;