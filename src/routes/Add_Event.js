import React, { useState, useEffect } from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { useNavigate } from 'react-router-dom';
import { api } from "../const.js";

const getData = async () => {
    const response = await fetch(api+'/api/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("CurrentUser")
        }
    });
    if (response.status === 401) {
        throw (new Error());
    } else if (response.status !== 200) {
        alert("Error")
        return;
    }

    const json = await response.json();

    return json.data;

}

// const fetchData = async (username, firstname, lastname, password) => {
//     try {
//         const response = await fetch(api+'/api/events', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ "username": username, "first_name": firstname, "last_name": lastname, "password": password })
//         });

//         if (response.status === 409) {
//             alert("Username is taken");
//             return;

//         }

//     } catch (error) {
//         alert(error);
//     }
// }

// const handleSubmit = () => {
//     fetchData(name, description, start_date, end_date, friends);
//     setName(''); setDescription(''); setStartDate(''); setEndDate(''); setFriends('');
// }

export default function Add_Event() {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [selected, setSelected] = useState('');
    const [to_display, setDisplay] = useState([]);

    useEffect(() => {
        getData().then((friendsList)=>{
            setDisplay([]);
            friendsList.forEach(f => setDisplay([...to_display, {name: f.friend.username, id:f.friend.id}]));
        }).catch(()=>{navigate('/login');})
    }, [navigate]);

    const handleSubmit = () => {
        console.log("asubviaw");
        // fetchData(codeEntered).catch(()=>{navigate('/login');});
        // setCodeEntered('');
    }


    return (
        <div className="container">
            <NavBar />
            <div>
                <div>Event title:</div>
                <InputText value={name} onChange={(e) => setName(e.target.value)} />
                <div>Description:</div>
                <div>
                <InputTextarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                cols={30}
                            />
                </div>

                <div>Start Date</div>
                <div>
                <Calendar value={start_date} onChange={(e) => setStartDate(e.value)} />
                </div>
                <div>End Date</div>
                <div>
                <Calendar value={end_date} onChange={(e) => setEndDate(e.value)} />
                </div>
                <div>Friends</div>
                <div >
                    <MultiSelect value={selected} onChange={(e) => setSelected(e.value)} options={to_display} optionLabel="name" optionValue="id" display="chip"
                    placeholder="Select Friends" className="w-full md:w-20rem" />
                </div>
                <div><Button label="Submit" onClick={handleSubmit} /></div>
            </div>
        </div>
    );

}