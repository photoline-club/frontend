import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { api } from "../const.js";
import { useNavigate } from 'react-router-dom';

const top_container_style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const middle_container_style = {
  marginTop: "10vh",
  width: "30vw",
};

const form_label_style = {
  marginTop: "2vh"

};

const form_bottom_style = {
  marginTop: "5vh"
};


const side_div1 = {
  display: 'inline-block',
  margin: '1rem',
};

const side_div2 = {
  display: 'flex',
  margin: '1rem',
};

const fetchData = async (name, pass) => {
  try {
    const response = await fetch(api + '/api/login', {
      method: 'POST',
      headers: { 'authorization': name + ':' + pass, },
      body: JSON.stringify({ username: name, password: pass })
    });

    if (response.status !== 201) {
      throw (new Error());
    }
    const json = await response.json();
    localStorage.setItem("CurrentUser", json.token);
    // var cat = localStorage.getItem("CurrentUser");
    // localStorage.removeItem("lastname");
    return 0;
  } catch (error) {
    alert("Username or password is wrong");
  }
}

export default function Login() {
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetchData(name, pass).then(() => { navigate('/home'); });
  }

  const handleRegisterSubmit = () => {
    navigate('/register');
  }


  return (
    <div style={top_container_style}>
      <div style={middle_container_style}>
        <h1>Login</h1>
        <div style={form_label_style}>Username:</div>
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
        <div style={form_label_style}>Password:</div>
        <Password value={pass} onChange={(e) => setPass(e.target.value)} feedback={false} tabIndex={0} />
        <div style={form_bottom_style}><div style={side_div1}><Button label="Submit" onClick={handleSubmit} /></div>
          <div style={side_div2}><Button label="Register" onClick={handleRegisterSubmit} /></div>
        </div>
      </div>
    </div>
  );
}
