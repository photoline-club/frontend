import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from './routes/Home.js';
import Profile from './routes/Profile.js';
import Login from './routes/Login.js';
import Event from './routes/Event.js';
import Register from './routes/Register.js';
import React, { useState } from "react"

import { Timeline } from 'primereact/timeline';

import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/Home" exact Component={Home} />
            <Route path="/Index" exact Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path='/event' Component={Event} />
          </Routes>
        </div>
      </Router>
    </PrimeReactProvider>
  );
}


export default App;
