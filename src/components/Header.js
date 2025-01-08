import React from 'react';
import '../App.css';
import LogoutButton from './LogoutButton';

function Header() {
    return (
        <header className="header">
            <h1 className="header-title">IMAGANN</h1>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/about" className="nav-link">About</a>
                    </li>
                    <li className="nav-item">
                        <a href="/contact" className="nav-link">Contact</a>
                    </li>
                    {/* ... */}
                    <LogoutButton />
                </ul>
            </nav>
        </header>
    );
}

export default Header;