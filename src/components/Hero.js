import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-contents">
                <h1 className="hero-title">Welcome To IMAGANN</h1>
                <div className="marquee">
                    <p className="hero-slogan">Where Imagination Meets Annotations...</p>
                </div>
                <Link to='/authentication'>
                    <button className="get-started-button">Get Started</button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;