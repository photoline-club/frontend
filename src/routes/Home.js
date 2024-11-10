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

    useEffect(() => {
        getData().then((eventsList)=>{
            setEvents([]);
            eventsList.forEach(e => setEvents([...events, {memory_name: e.title, description: e.description, start_date: new Date(e.event_start).toLocaleDateString(), end_date: new Date(e.event_end).toLocaleDateString()}]));
        }).catch(()=>{navigate('/login');})
    }, [navigate]);


    // const events = [
    //     { memory_name: 'Ordered', date: '15/10/2020 10:30', image: 'game-controller.jpg' },
    //     { memory_name: 'Processing', date: '15/10/2020 14:00'},
    //     { memory_name: 'Shipped', date: '15/10/2020 16:15'},
    //     { memory_name: 'Delivered', date: '16/10/2020 10:00'}
    // ];

    const customizedContent = (event) => {
        return (
            <Card title={<p class = "event_title">{event.memory_name}</p>} subTitle={<p class = "event_date">{event.start_date} - {event.end_date}</p>} className = "wrapper">
                {/* Add comment of memory_name here */}
                <p class = "event_content">{event.description}</p>
                <Button className="p-button-text" ><Link to='Event' className = "event_content">Read more</Link></Button>
            </Card>
        );

    };

    return (
        <div className="container">
            <NavBar />

            <section>
                <h1 id = "title">Photoline</h1>
                <div className="card">
                    <Timeline value={events} align="alternate" className="customized-timeline" content={customizedContent} />
                </div>
            </section>
        </div>

    );
}
