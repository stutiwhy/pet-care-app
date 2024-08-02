

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaMapMarkerAlt, FaFirstAid, FaPaw } from 'react-icons/fa';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <span>PetPocket</span>
      </div>
      <ul>
        <li><Link to="/home"> <FaHome /> Home</Link></li>
        <li><Link to="/add-activity"><FaPlus /> Add Activity</Link></li>
        <li><Link to="/near-you"><FaMapMarkerAlt /> Near You</Link></li>
        <li><Link to="/first-aid-help"><FaFirstAid /> First Aid Help</Link></li>
        <li><Link to="/view-pet"><FaPaw /> View Pet</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
