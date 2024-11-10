// import { useState, useEffect } from "react";
// import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import '../App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'Black'
  };

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <div className="navcontainer">
                <Link to='/' style={linkStyle}>Home</Link>
                <Link to='profile' style={linkStyle}>Profile</Link>
                <Link to='add_event' style={linkStyle}>Add Event</Link>
                </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}