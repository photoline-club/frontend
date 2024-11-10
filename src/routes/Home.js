import React, { useEffect } from "react";
import '../App.css';
import { NavBar } from "../components/NavBar";
import { useNavigate  } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        if (!('CurrentUser' in localStorage)) {
        navigate('/login');
        }
    }, [navigate]);

    return (

        <div className="container">
            <NavBar />
        </div>
    );
}