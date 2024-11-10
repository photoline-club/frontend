import { Link } from "react-router-dom";
import logo from "../logo (1).png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const navbar_logo = {
  marginLeft: "1rem",
};

const navbar_main = {
  marginTop: "1.5rem",
  marginLeft: "1.5rem",
};

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "Black",
};

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <div style={navbar_logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
          <Link to="/home" style={linkStyle}>
            Home
          </Link>
          {"CurrentUser" in localStorage ? (
            <Link to="/friend" style={linkStyle}>
              Add Friend
            </Link>
          ) : (
            ""
          )}
          {"CurrentUser" in localStorage ? (
            <Link to="/add_event" style={linkStyle}>
              Add Event
            </Link>
          ) : (
            ""
          )}
          {"CurrentUser" in localStorage ? (
            <Link to="/logout" style={linkStyle}>
              Logout
            </Link>
          ) : (
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
};

