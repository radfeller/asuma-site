import React from 'react';
import {Link,useLocation} from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const location = useLocation()

    return (
        <nav className='navbar'>
            <div className='nav-links'>
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Меню
                </Link>

                <Link
                    to='/citymap'
                    className={`nav-link ${location.pathname === '/citymap' ? 'active' : ''}`}
                >
                    Карта Города
                </Link>
            </div>
        </nav>
    )
}