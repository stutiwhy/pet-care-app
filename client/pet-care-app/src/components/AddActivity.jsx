import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../utils/HandleAPIs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Navbar from "./Navbar";
import "../styles/AddActivity.css"; // Import the CSS file

const AddActivity = ({ onAddActivity }) => {
  const [activity, setActivity] = useState({
    name: "",
    time: "",
    notes: "",
    type: "one-time",
    date: "",
    frequency: "everyday",
    interval: 1
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newActivity = await createActivity(activity);
      Toastify({
        text: "Activity created successfully!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50",
      }).showToast();
      onAddActivity(newActivity); 
      navigate("/home"); 
    } catch (error) {
      console.error("There was an error!", error);
      Toastify({
        text: "Error creating activity.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#F44336",
      }).showToast();
    }
  };

  return (
    <div className="add-activity-page">
      <Navbar />
      <main className="add-activity-content">
        <h1>Add Activity</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" value={activity.name} onChange={handleChange} placeholder=" " />
            <label>Activity Name:</label>
          </div>
          <div className="form-group">
            <input type="time" name="time" value={activity.time} onChange={handleChange} placeholder=" " />
            <label>Time:</label>
          </div>
          <div className="form-group">
            <textarea name="notes" value={activity.notes} onChange={handleChange} placeholder=" "></textarea>
            <label>Notes:</label>
          </div>
          <div className="form-group">
            <select name="type" value={activity.type} onChange={handleChange}>
              <option value="one-time">One-time</option>
              <option value="recurring">Recurring</option>
            </select>
            <label>Type:</label>
          </div>
          {activity.type === "one-time" && (
            <div className="form-group">
              <input type="date" name="date" value={activity.date} onChange={handleChange} placeholder=" " />
              <label>Date:</label>
            </div>
          )}
          {activity.type === "recurring" && (
            <div className="form-group">
              <select name="frequency" value={activity.frequency} onChange={handleChange}>
                <option value="everyday">Everyday</option>
                <option value="interval">Every X Days</option>
              </select>
              <label>Frequency:</label>
              {activity.frequency === "interval" && (
                <div className="form-group">
                  <input type="number" name="interval" value={activity.interval} onChange={handleChange} placeholder=" " />
                  <label>Interval (days):</label>
                </div>
              )}
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default AddActivity;
