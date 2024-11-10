import React, { useState, useEffect } from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate, Link } from 'react-router-dom';
import { api } from "../const.js";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'Black'
};

const getCode = async () => {
  try {
    const response = await fetch(api + '/api/friendcode', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("CurrentUser")
      }
    });

    if (response.status === 401) { //Needs to login
      throw (new Error());
    } else if (response.status !== 200) { // Check success code
      return "not code found";
    }

    const json = await response.json();

    return json.code;

  } catch (error) {
    return 'code not found';
  }
}

const fetchData = async (code) => {
  try {
    const response = await fetch(api + '/api/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("CurrentUser")
      },
      body: JSON.stringify({ 'token': code })
    });

    if (response.status === 409) {
      alert("Already added as a friend");
      return;
    } else if (response.status === 401) {
      throw (new Error());
    } else if (response.status === 404) {
      alert('invalid code');
      return;
    }
    if (response.status !== 201) {
      alert("Error");
      return;
    }

  } catch (error) {
    return;
  }
}

export default function Friend() {
  let navigate = useNavigate();
  const [code, setCode] = useState('');
  useEffect(() => {
    getCode().then(setCode).catch(() => { navigate('/login'); })
  }, [navigate]);

  const [codeEntered, setCodeEntered] = useState('');

  const handleSubmit = () => {
    fetchData(codeEntered).catch(() => { navigate('/login'); });
    setCodeEntered('');
  }

  return (
    <div className="container">
      <NavBar />
      <div>
        Your code: {code}
      </div>
      <div>
        Enter code:
      </div>
      <InputText value={codeEntered} onChange={(e) => setCodeEntered(e.target.value)} />
      <div><Button label="Submit" onClick={handleSubmit} /><Link to='/register' style={linkStyle}>Register</Link></div>
    </div>
  );
}
