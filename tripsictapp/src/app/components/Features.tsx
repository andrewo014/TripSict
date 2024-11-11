// src/components/Features.js
import React from 'react';
import './Features.css';

function Features() {
  return (
    <div className="features">
      <div className="feature">
        <img src="Images/heart.png" alt="Heart" className="icon" />
        <p>Save Lodging, Restaurants <br /> and Attractions</p>
      </div>
      <div className="feature">
        <img src="Images/plane.png" alt="Plane" className="icon" />
        <p>Save your flight <br /> information</p>
      </div>
      <div className="feature">
        <img src="Images/notebook.png" alt="Notebook" className="icon" />
        <p>Create and save custom <br /> note entries</p>
      </div>
      <div className="feature">
        <img src="Images/star.png" alt="Star" className="icon" />
        <p>View star ratings for <br /> all locations</p>
      </div>
    </div>
  );
}

export default Features;
