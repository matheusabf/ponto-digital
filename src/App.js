
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import './index.css';


import Header from './components/Header';

function App() {
  return (
      <Router>
    <div className="container">
        <Header />
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
