import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from "./routes/Home.js";
import Profile from "./routes/Profile.js";
import Login from "./routes/Login.js";
import Event from "./routes/Event.js";
import Register from "./routes/Register.js";
import Friend from "./routes/Friend.js";
import Logout from "./routes/Logout.js";
import Add_Event from "./routes/Add_Event.js";
import Images from "./routes/Images.js";

import { PrimeReactProvider } from "primereact/api";
import UploadImage from "./routes/UploadImage";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <div style={{ height: "100%" }}>
          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/index" Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/friend" Component={Friend} />
            <Route path="/logout" Component={Logout} />
            <Route path="/event" Component={Event} />
            <Route path="/events/:id/upload" Component={UploadImage} />
            <Route path="/add_event" Component={Add_Event} />
            <Route path="/events/:id" Component={Images} />
            <Route path="/add_event" Component={Add_Event} />
            <Route path="/events/:id/upload" Component={UploadImage} />
          </Routes>
        </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
