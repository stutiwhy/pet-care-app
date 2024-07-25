// src/components/ViewPet.jsx
import React, { useEffect, useState } from 'react';
import { fetchPet } from '../utils/HandleAPIs';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

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

  if (error) return <div>{error}</div>;
  if (!pet) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pet Details</h1>
      <div>
        <h2>{pet.name}</h2>
        <p><strong>Animal:</strong> {pet.animal}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Date of Birth:</strong> {new Date(pet.dateOfBirth).toDateString()}</p>
      </div>
    </div>
  );
};

export default ViewPet;
