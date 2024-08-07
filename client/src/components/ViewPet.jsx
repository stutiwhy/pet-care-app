import React, { useEffect, useState } from 'react';
import { fetchPet } from '../utils/HandleAPIs';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Navbar from './Navbar'; 
import '../styles/ViewPet.css'; 

const ViewPet = () => {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPet = async () => {
      try {
        const petData = await fetchPet();
        setPet(petData);
      } catch (error) {
        setError(error.message);
        Toastify({
          text: error.message,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#F44336',
        }).showToast();
      }
    };

    getPet();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!pet) return <div className="loading">Loading...</div>;

  return (
    <div className="view-pet-page">
      <Navbar />
      <main className="view-pet-content">
        <h1>Pet Details</h1>
        <div className="pet-details">
          <h2>{pet.name}</h2>
          <p><strong>Animal:</strong> {pet.animal}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(pet.dateOfBirth).toDateString()}</p>
        </div>
      </main>
    </div>
  );
};

export default ViewPet;