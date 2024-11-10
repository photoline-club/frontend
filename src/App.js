import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

import Home from './routes/Home.js';
import Profile from './routes/Profile.js';
import Login from './routes/Login.js';
import Event from './routes/Event.js';
import Register from './routes/Register.js';
import Friend from './routes/Friend.js';
import Logout from './routes/Logout.js';

import { Timeline } from 'primereact/timeline';

import { PrimeReactProvider } from 'primereact/api';
import Add_Event from './routes/Add_Event.js';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/home" exact Component={Home} />
            <Route path="/index" exact Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/friend" Component={Friend} />
            <Route path="/logout" Component={Logout} />
            <Route path="/event" Component={Event} />
            <Route path='/add_event' Component={Add_Event} />
          </Routes>
        </div>
      </Router>
    </PrimeReactProvider>
  );
}


export default App;
