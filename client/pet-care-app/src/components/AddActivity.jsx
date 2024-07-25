// src/components/AddActivity.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../utils/HandleAPIs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
      onAddActivity(newActivity); // Add this line to call the callback
      navigate("/home/view-activities");
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
    <div>
      <h1>Add Activity</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Activity Name:</label>
          <input type="text" name="name" value={activity.name} onChange={handleChange} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={activity.time} onChange={handleChange} />
        </div>
        <div>
          <label>Notes:</label>
          <textarea name="notes" value={activity.notes} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={activity.type} onChange={handleChange}>
            <option value="one-time">One-time</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        {activity.type === "one-time" && (
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={activity.date} onChange={handleChange} />
          </div>
        )}
        {activity.type === "recurring" && (
          <div>
            <label>Frequency:</label>
            <select name="frequency" value={activity.frequency} onChange={handleChange}>
              <option value="everyday">Everyday</option>
              <option value="interval">Every X Days</option>
            </select>
            {activity.frequency === "interval" && (
              <div>
                <label>Interval (days):</label>
                <input type="number" name="interval" value={activity.interval} onChange={handleChange} />
              </div>
            )}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddActivity;
