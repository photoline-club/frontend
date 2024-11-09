import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { api } from "../const.js";



const fetchData = async (username, firstname, lastname, password) => {
    try {
        const response = await fetch(api+'/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "first_name": firstname, "last_name": lastname, "password": password })
        });

        if (response.status === 409) {
            alert("Username is taken");
            return;

        }

    } catch (error) {
        alert(error);
    }
}

export default function Login() {
    const [name, setName] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');

    const handleSubmit = () => {
        if (pass===passConf) {
            fetchData(name, first, last, pass);
            setName(''); setFirst(''); setLast(''); setPass(''); setPassConf('');
        } else {
            alert("Passwords must match");
        }
    }

    return (
        <div>
            <NavBar />
            <div>
                <div>Username:</div>
                <InputText value={name} onChange={(e) => setName(e.target.value)} />
                <div>First name:</div>
                <InputText value={first} onChange={(e) => setFirst(e.target.value)} />
                <div>Last name:</div>
                <InputText value={last} onChange={(e) => setLast(e.target.value)} />
                <div>Password:</div>
                <Password value={pass} onChange={(e) => setPass(e.target.value)} feedback={false} tabIndex={1} />
                <div>Confirm Password:</div>
                <Password value={passConf} onChange={(e) => setPassConf(e.target.value)} feedback={false} tabIndex={1} />
                <div><Button label="Submit" onClick={handleSubmit} /></div>
            </div>
        </div>
    );
}