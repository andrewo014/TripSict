// src/components/Content.js
import React from 'react';
import './Content.css';

function Content() {
  return (
    <main className="content">
      <div className="newUser">
        <h1>Use our app to plan your <br /> next getaway!</h1>
        <p>With up-to-date information on lodging, <br /> food, and points of interest, <br /> travel planning has never been easier!</p>
        <button className="register-btn">New User? Register Here</button>
        <button className="sign-in2">Sign In</button>
      </div>
      <div className="app-container">
        <div className="top-bar">
          <div className="window-controls">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="nav-controls">
            <span className="arrow left">&larr;</span>
            <span className="arrow right">&rarr;</span>
          </div>
        </div>
        <img src="Images/example page.PNG" alt="Paris Trip Preview" className="trip-preview" />
      </div>
    </main>
  );
}

export default Content;
