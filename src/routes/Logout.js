import React, { useEffect } from "react";
import '../App.css';

import { useNavigate  } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("CurrentUser")
        navigate('/login');
    }, [navigate]);
    return (
        <div></div>
    );
}