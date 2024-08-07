import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/FirstAidHelp.css';

//making separate files because pura kachra ho gaya tha yaha pe
import dogTips from '../tips/dogTips';
import catTips from '../tips/catTips';
import birdTips from '../tips/birdTips';
import fishTips from '../tips/fishTips';

const FirstAidHelp = () => {
  const [selectedPetType, setSelectedPetType] = useState("dog");

  //object banaya hai taaki aage map kar sakte hai? shayad map karungi..pata nahi mujhe 
  const tips_pages = {
    dog: dogTips,
    cat: catTips,
    bird: birdTips,
    fish: fishTips,
  };

  return (
    <div className="first-aid-help-page">
      <Navbar />
      <main className="first-aid-help-content">
        <h1>First Aid Help</h1>
        <div className="pet-type-selector">
          <label htmlFor="pet-type">Select Pet Type:</label>
          <select
            id="pet-type"
            value={selectedPetType}
            onChange={(e) => setSelectedPetType(e.target.value)}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="fish">Fish</option>
          </select>
        </div>
        <ul className="tips-list">
          {tips_pages[selectedPetType].map((tip, index) => (
            <li key={index}>
              <h2>{tip.title}</h2>
              <p>{tip.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default FirstAidHelp;
