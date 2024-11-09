import './App.css';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Home from './routes/Home.js';
import Profile from './routes/Profile.js';
import Login from './routes/Login.js';
import Register from './routes/Register.js';
import React, { useState } from "react"



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/Home" exact Component={Home} />
          <Route path="/Index" exact Component={Home} />
          <Route path="/profile" Component={Profile} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
