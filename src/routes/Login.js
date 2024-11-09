import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { api } from "../const.js";

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'Black'
};

const fetchData = async (name, pass) => {
    try {
        alert('agiawrbev');
        const response = await fetch(api+'/api/login', {
            method: 'POST',
            headers: {'authorization': name+':'+pass,},
            body: JSON.stringify({ username: name, password: pass })
        });

        alert(response.status);

        if (response.status !== 201) {
            alert("Login fail");
            return;
        }
        const json = await response.json();
        localStorage.setItem("CurrentUser", json.token);
        // var cat = localStorage.getItem("CurrentUser");
        // localStorage.removeItem("lastname");
    } catch (error) {
        alert(error);
        alert("Username or password is wrong");
    }
}

export default function Login() {
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        fetchData(name, pass);
    }

    return (
        <div>
            <NavBar />
            <div>
                <div>Username:</div>
                <InputText value={name} onChange={(e) => setName(e.target.value)} />
                <div>Password:</div>
                <Password value={pass} onChange={(e) => setPass(e.target.value)} feedback={false} tabIndex={1} />
                <div><Button label="Submit" onClick={handleSubmit} /><Link to='/register' style={linkStyle}>Register</Link></div>
            </div>
        </div>
    );
}