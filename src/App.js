import './App.css';
import React, { useState } from "react"

import { Timeline } from 'primereact/timeline';

function App() {


  const events = [
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
      
  return ( <>
    <section>
        <h1 id = "title">Photoline</h1>
        <div className="card">
            <Timeline value={events} opposite={(item) => item.date} content={(item) => <small className="text-color-secondary">{item.status}</small>} />
        </div>
    </section>
    </>
  )
}


// function Clock(){
  
//   const [time, setTime] = useState(new Date().toLocaleTimeString("UK"));
//   setInterval(() => setTime(new Date().toLocaleTimeString("UK")), 1000);
//   return <p>It's Currently: {time}</p>
// }

export default App;
