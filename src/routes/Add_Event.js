import React, { useState } from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { api } from "../const.js";



export default function Add_Event() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [selectedFriends, setFriends] = useState(null);

    // Get all friends
    const friends = [
        { name: 'Bob'},
        { name: 'Gary'},
    ];


    // const fetchData = async (username, firstname, lastname, password) => {
    //     try {
    //         const response = await fetch(api+'/api/add_event', {
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
                    <MultiSelect value={selectedFriends} onChange={(e) => setFriends(e.value)} options={friends} optionLabel="name" display="chip" 
                    placeholder="Select Friends" className="w-full md:w-20rem" />
                </div>
            </div>
        </div>
    );

}