import React, { useEffect, useState } from 'react';
import '../App.css'; // Ensure this is correct if you have global styles

function Features() {
    const features = [
        { 
            id: 1, 
            title: 'Intuitive Image Annotation', 
            description: 'Easily upload images and annotate objects with our user-friendly interface, enhancing your workflow and productivity.' 
        },
        { 
            id: 2, 
            title: 'Batch Processing', 
            description: 'Annotate multiple images at once, saving time and streamlining your projects for efficient handling of large datasets.' 
        },
        { 
            id: 3, 
            title: 'Customizable Annotations', 
            description: 'Utilize a variety of annotation tools and options to tailor your annotations to specific project needs, ensuring precision and clarity.' 
        },
        
    ];

    const [displayedFeatures, setDisplayedFeatures] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < features.length) {
            const timeout = setTimeout(() => {
                setDisplayedFeatures((prev) => [...prev, features[currentIndex]]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, 2000); // Change features every 2 seconds

            return () => clearTimeout(timeout);
        }
    }, [currentIndex]);

    return (
        <section className="features-section">
            <h2 className="features-title">Our Features</h2>
            <div className="features-container">
                {displayedFeatures.map((feature) => (
                    <div key={feature.id} className="feature-card">
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;