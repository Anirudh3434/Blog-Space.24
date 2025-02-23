import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h4>Projects</h4>
       
          <a href="https://24portfolio.netlify.app">Portfolio</a>
        <a href="https://24weather.netlify.app">Weather.24</a>
          <a href="https://24chat.netlify.app">Chat.24</a>
       
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: anigokala3@gmail.com</p>
        <p>Phone: +91 9812455974</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <p>Facebook | Twitter | Instagram</p>
      </div>
    </footer>
  );
};

export default Footer;
