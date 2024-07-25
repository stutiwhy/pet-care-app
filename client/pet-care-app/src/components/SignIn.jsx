// src/components/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePet } from "../utils/HandleAPIs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const SignIn = () => {
  const [pet, setPet] = useState({
    name: "",
    animal: "",
    breed: "",
    gender: "idk/prefer not to say",
    dateOfBirth: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await savePet(pet);
      console.log("Pet added/updated:", response);
      Toastify({
        text: "Pet added/updated successfully!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50", // Green color for success
      }).showToast();
      navigate("/home");
    } catch (error) {
      console.error("There was an error!", error);
      Toastify({
        text: "Error adding/updating pet.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#F44336", // Red color for error
      }).showToast();
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={pet.name} onChange={handleChange} />
        </div>
        <div>
          <label>Animal:</label>
          <input type="text" name="animal" value={pet.animal} onChange={handleChange} />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="breed" value={pet.breed} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={pet.gender} onChange={handleChange}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="idk/prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={pet.dateOfBirth} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
