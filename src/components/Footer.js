import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#282c34',
            color: 'white',
            width: '97.9%',
            height: '12cm',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}>
            <p style={{ margin: '0', lineHeight: '1.6' }}>&copy; 2024 IMAGANN. Presented by Group ONE.</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '800px',
                marginTop: '10px',
                alignItems: 'center', // Align items vertically in the center
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px'}}>
                    <h4 style={{ margin: '0', lineHeight: '1.6' }}>Members:</h4>
                    <p style={{ margin: '0', lineHeight: '1.6' }}><span>UBa22PB002:</span> ABONWI NEVIL SUH</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}><span>UBa22PB004:</span>ALEMNGU TERENCE NGULEFAC</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}><span>UBa22PH001:</span>ACHOH COLLINS NDIWUN</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}><span>UBa22PH004:</span>ALACHE RUTH</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}><span>UBa22PH003:</span>ALEMBOM KETILLA </p>


                    <p style={{ margin: '0', lineHeight: '1.6' }}>STILL TO BE SAID</p>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <h4 style={{ margin: '0', lineHeight: '1.6' }}>Course-Info:</h4>
                    <p style={{ margin: '0', lineHeight: '1.6' }}>Course Supervisor: Mr. MBIETCHEU CAESAR</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}>Course Title: Web Programming</p>
                    <p style={{ margin: '0', lineHeight: '1.6' }}>Course Code: CENP4107</p>
                </div>
            </div>
            <div style={{
                marginTop: '10px',
                display: 'flex',
                gap: '10px', // Space between icons
            }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} style={{ color: 'white', fontSize: '1.5rem' }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} style={{ color: 'white', fontSize: '1.5rem' }} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', fontSize: '1.5rem' }} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} style={{ color: 'white', fontSize: '1.5rem' }} />
                </a>
            </div>
            <div style={{ marginTop: '10px' }}>
                <a href="/about" style={{ color: 'white', marginRight: '15px', lineHeight: '1.6' }}>About Us</a>
                <a href="/privacy" style={{ color: 'white', marginRight: '15px', lineHeight: '1.6' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: 'white', lineHeight: '1.6' }}>Terms of Service</a>
            </div>
        </footer>
    );
}

export default Footer;