// src/components/NearYou.jsx
import React from "react";
import { Link } from "react-router-dom";

const NearYou = () => {
  return (
    <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/add-activity">Add Activity</Link></li>
          <li><Link to="/near-you">Near You</Link></li>
          <li><Link to="/first-aid-help">First Aid Help</Link></li>
          <li><Link to="/view-pet">View Pet</Link></li>
        </ul>
      <h1>Near You</h1>
      <p>This section will be updated with information about nearby places such as vets or pet stores.</p>
      <p>Stay tuned!</p>
    </div>
  );
};

export default NearYou;
