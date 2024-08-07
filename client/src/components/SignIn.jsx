import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePet } from "../utils/HandleAPIs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../styles/SignIn.css";
import { FaPaw } from 'react-icons/fa';


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
      console.log("Pet added:", response);
      Toastify({
        text: "Pet added successfully!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50", // green color for success
      }).showToast();
      navigate("/home");
    } catch (error) {
      console.error("There was an error!", error);
      Toastify({
        text: "Error adding pet.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#F44336", // Red color for error
      }).showToast();
    }
  };

  return (
    <div className="sign-in-page">
      <div className="gradient-half">
        <div className="header">
          <div className="logo">
          <FaPaw size={40} color="#9a06d9" />
          </div>
          <div className="site-name">PetPocket</div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={pet.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <label htmlFor="name">Name:</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="animal"
                name="animal"
                value={pet.animal}
                onChange={handleChange}
                placeholder="Animal"
              />
              <label htmlFor="animal">Animal:</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="breed"
                name="breed"
                value={pet.breed}
                onChange={handleChange}
                placeholder="Breed"
              />
              <label htmlFor="breed">Breed:</label>
            </div>
            <div className="form-group">
              <select
                id="gender"
                name="gender"
                value={pet.gender}
                onChange={handleChange}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="idk/prefer not to say">Prefer not to say</option>
              </select>
              <label htmlFor="gender">Gender:</label>
            </div>
            <div className="form-group">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={pet.dateOfBirth}
                onChange={handleChange}
              />
              <label htmlFor="dateOfBirth">Date of Birth:</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="image-half"></div> 
    </div>
  );
};

export default SignIn;
