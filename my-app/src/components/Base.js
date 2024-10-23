// src/components/Base.js
import React from 'react';
import './Base.css'; // Import your CSS for styling

function Base() {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>Copyright &copy; 2024 Care-Match | All Rights Reserved</p>
      </div>

      <div className="social-media">
        <a href="https://www.facebook.com/profile.php?id=100086376409925"><i className="fab fa-facebook"></i></a>
        <a href="https://discord.gg/WKAdcgSr"><i className="fab fa-discord"></i></a>
        <a href="https://www.instagram.com/kimmy01432/"><i className="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/in/froillan-kim-b-edem-5b591b252/"><i className="fab fa-linkedin"></i></a>
      </div>

      <div className="footer-iconTop">
        <a href="#"><i className="fas fa-arrow-up"></i></a>
      </div>
    </footer>
  );
}

export default Base;
