import React from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import { Link } from "react-router-dom";

export default function Home() {
    // Need to get memory_name, date of memory and an image if wanted

    const events = [
        { memory_name: 'Ordered', date: '15/10/2020 10:30', image: 'game-controller.jpg' },
        { memory_name: 'Processing', date: '15/10/2020 14:00'},
        { memory_name: 'Shipped', date: '15/10/2020 16:15'},
        { memory_name: 'Delivered', date: '16/10/2020 10:00'}
    ];

    const customizedContent = (item) => {
        return (
            <Card title={<p class = "event_title">{item.memory_name}</p>} subTitle={<p class = "event_date">{item.date}</p>} className = "wrapper">
                { item.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} className="shadow-1"/>}
                {/* Add comment of memory_name here */}
                <p class = "event_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
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
