import React, {useStatus, useEffect, useState} from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import { useNavigate, Link } from "react-router-dom";
import { api } from "../const.js";


const getData = async () => {
    const response = await fetch(api+'/api/events', {
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

    return json.events;
}


export default function Home() {

    let navigate = useNavigate();
    // Need to get memory_name, date of memory and an image if wanted

    const [events, setEvents] = useState([]);
    const [eventLink, setEventLink] = useState('');

    useEffect(() => {
        getData().then((eventsList)=>{
            setEvents([]);
            const temp_list = [];
            eventsList.forEach(e => temp_list.push({memory_name: e.title, description: e.description, start_date: new Date(e.event_start).toLocaleDateString(), end_date: new Date(e.event_end).toLocaleDateString(), id: e.id}));
            setEvents(temp_list);
        }).catch(()=>{navigate('/login');})
    }, [navigate]);


    const handleEventClick = (event) => {
        // console.log(event);
        // navigate('/events/'+event.id);
        // You can access event details here
    };


    return (
        <div className="container">
            <NavBar />

            <section>
                <h1 id = "title">Photoline</h1>
                <div className="card">
                    <Timeline value={events}
                        opposite={(event) => <small><Link to={ '/events/'+event.id } className = "event_link">{event.memory_name}</Link></small>} content={(event) => <small className="text-color-secondary">{event.start_date}-{event.end_date}</small>}
                        onClick={(e) => handleEventClick(e)} />
                </div>
            </section>
        </div>

    );
}
