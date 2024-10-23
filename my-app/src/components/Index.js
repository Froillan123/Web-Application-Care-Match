// src/components/Index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Index.css'; // Ensure this file exists and is correctly linked
import Base from './Base'; // Importing the Base (footer) component

function Index() {
  const [isDropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive(!isDropdownActive);
  };

  useEffect(() => {
    const menuIcon = document.querySelector('#menu-icon');
    const dropdownMenu = document.querySelector('#dropdown-menu');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header a');

    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      dropdownMenu.classList.toggle('active');
    };

    const handleScroll = () => {
      sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');

            let activeLink = document.querySelector('header a[href*="' + id + '"]');
            if (activeLink) {
              activeLink.classList.add('active');
            }
          });
        }
      });

      header.classList.toggle('sticky', window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDropdownActive]); // Adding isDropdownActive to the dependency array

  return (
    <div>
      <header className="nav">
        <div className="logo">
          <img class="img" src="/images/png.png" alt=""/>
          <h1>
            <span style={{ color: '#0aa45f' }}>Care</span>-Match
          </h1>
        </div>
        <i className='bx bx-menu' id="menu-icon" onClick={toggleDropdown}></i>
        <div className={`dropdown ${isDropdownActive ? 'active' : ''}`} id="dropdown-menu">
          <div className="buttons" id="buttons">
            <Link to="/login" className="button">Log In</Link>
            <Link to="/register" className="button">Sign Up</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="main-container">
          <div className="text-content">
            <h1>
              Welcome to <span style={{ color: '#0aa45f' }}>Care</span>-Match Find Your Perfect Caregiver Anytime, Anywhere!
            </h1>
            <p>
              At Care-Match, we understand that finding the right caregiver is essential for your loved ones' well-being. Our platform connects you with compassionate, qualified caregivers tailored to meet your unique needs. Whether you need assistance at home or specialized care, we're here to help you make the perfect match.
            </p>
            <a href="#" className="watch-video-btn">Watch a video about us!</a>
          </div>
          <div className="image-content">
            <img src="/images/mainpic.png" alt="Caregiver and patient" className="hide-image" />
          </div>
        </section>

        <div className="image-shown">
          <img src="/images/mainpic.png" alt="Caregiver and patient" className="full-width-image" />
        </div>

        <section className="services" id="services">
          <h2 className="heading">Our <span style={{ color: 'var(--primary-color)' }}>Services</span></h2>
          <div className="services-container">
            {[ 
              { icon: 'bx-home', title: 'In-Home Care', description: 'Compassionate caregivers providing personalized care in the comfort of your home.' },
              { icon: 'bx-user-circle', title: 'Specialized Care', description: 'Expert caregivers for specific needs, including Alzheimer’s and dementia care.' },
              { icon: 'bx bxs-heart', title: 'Respite Care', description: 'Temporary relief for primary caregivers, ensuring your loved one is well cared for.' },
              { icon: 'bx bx-smile', title: 'Companionship', description: 'Providing companionship and emotional support to enhance your loved one\'s quality of life.' },
              { icon: 'bx-briefcase', title: 'Healthcare Staffing', description: 'Qualified professionals to meet your healthcare staffing needs.' },
              { icon: 'bx-calendar', title: 'Activity Planning', description: 'Personalized activities to promote engagement and joy.' },
            ].map((service, index) => (
              <div className="services-box" key={index}>
                <i className={`bx ${service.icon}`}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Base />
    </div>
  );
}

export default Index;
