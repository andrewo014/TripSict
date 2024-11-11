// src/components/Navbar.js
import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">TripSict</div>
      <img src="Images/triptact logo jp.jpg" alt="Triptact Photo Log" width="80" height="80" className="logoImage" />
      <button className="sign-in">Sign In</button>
    </header>
  );
}

export default Navbar;
