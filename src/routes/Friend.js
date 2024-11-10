import React, { useState, useEffect }  from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { api } from "../const.js";

const top_container_style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const middle_container_style = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',

    margin: 'auto'
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

const getCode = async () => {
    const response = await fetch(api+'/api/friendcode', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("CurrentUser")
        }
    });

    if (response.status === 401) { //Needs to login
        throw (new Error());
    } else if (response.status !== 200) { // Check success code
        return "not code found";
    }

    const json = await response.json();

    return json.code;
}

const fetchData = async (code) => {
    const response = await fetch(api+'/api/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("CurrentUser")
        },
        body: JSON.stringify({ 'token': code})
    });

    if (response.status === 409) {
        alert("Already added as a friend");
        return;
    } else if (response.status === 401) {
        throw(new Error());
    } else if (response.status === 404) {
        alert('invalid code');
        return;
    }
    if (response.status !==201) {
        alert("Error");
        return;
    }
}

export default function Friend() {
    let navigate = useNavigate();

    const [code, setCode] = useState('');
    useEffect(() => {
        getCode().then(setCode).catch(()=>{navigate('/login');})
    }, [navigate]);

    const [codeEntered, setCodeEntered] = useState('');

    const handleSubmit = () => {
        fetchData(codeEntered).catch(()=>{navigate('/login');});
        setCodeEntered('');
    }

    return (
        <div>
            <NavBar />
            <div style={top_container_style}>
                <div style={middle_container_style}>
                <div>
                    Your code: { code }
                </div>
                <div>
                    Enter code:
                </div>
                <InputText value={codeEntered} onChange={(e) => setCodeEntered(e.target.value)} />
                <div><Button label="Submit" onClick={handleSubmit} /></div>
                </div>
            </div>
        </div>
    );
}