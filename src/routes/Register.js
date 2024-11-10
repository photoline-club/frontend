import React, { useState } from "react";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { api } from "../const.js";
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";

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
    display:'inline-block',
    margin: '1rem',
};

const side_div2 = {
    display:'inline-block',
    margin: '1rem',
};

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
            throw(new Error());

        }

    } catch (error) {
    }
}

export default function Login() {
    const [name, setName] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (pass===passConf) {
            fetchData(name, first, last, pass);
            setName(''); setFirst(''); setLast(''); setPass(''); setPassConf('');
        } else {
            alert("Passwords must match");
        }

        fetchData(name, pass).then(()=>{navigate('/login');});
    }

    const handleLoginSubmit = () => {
        navigate('/login');
    }

    return (
        <div style={top_container_style}>
            <div style={middle_container_style}>
                <h1>Register</h1>
                <div style={form_label_style}>Username:</div>
                <InputText value={name} onChange={(e) => setName(e.target.value)} />
                <div style={form_label_style}>First name:</div>
                <InputText value={first} onChange={(e) => setFirst(e.target.value)} />
                <div style={form_label_style}>Last name:</div>
                <InputText value={last} onChange={(e) => setLast(e.target.value)} />
                <div style={form_label_style}>Password:</div>
                <Password value={pass} onChange={(e) => setPass(e.target.value)} feedback={false} tabIndex={1} />
                <div style={form_label_style}>Confirm Password:</div>
                <Password value={passConf} onChange={(e) => setPassConf(e.target.value)} feedback={false} tabIndex={1} />
                <div style={form_bottom_style}><div style={side_div1}><Button label="Submit" onClick={handleSubmit} /></div>
                <div style={side_div2}><Button label="Login" onClick={handleLoginSubmit} /></div></div>
            </div>
        </div>
    );
}