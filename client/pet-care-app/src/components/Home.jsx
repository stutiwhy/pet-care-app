// src/components/Home.js
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { fetchActivities } from "../utils/HandleAPIs";
import AddActivity from "./AddActivity";
import NearYou from "./NearYou";
import FirstAidHelp from "./FirstAidHelp";
import ViewPet from "./ViewPet";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetchActivities();
        console.log("Fetched activities:", response);
        setActivities(response);
      } catch (error) {
        console.error("There was an error fetching the activities!", error);
      }
    };

    loadActivities();
  }, []);

  useEffect(() => {
    const checkActivityTimes = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const formattedCurrentTime = `${hours}:${minutes}`;
      console.log("Current time:", formattedCurrentTime);

      activities.forEach(activity => {
        console.log("Checking activity:", activity);
        if (activity.time === formattedCurrentTime) {
          console.log(`Activity time matches: ${activity.name}`);
          Toastify({
            text: `Reminder: ${activity.name} activity is due!`,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
          }).showToast();
          console.log(`Reminder shown for activity: ${activity.name}`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkActivityTimes);
  }, [activities]);

  const addNewActivity = (newActivity) => {
    setActivities(prevActivities => [...prevActivities, newActivity]);
  };

  const manualCheckActivityTimes = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedCurrentTime = `${hours}:${minutes}`;
    console.log("Manual check - Current time:", formattedCurrentTime);

    activities.forEach(activity => {
      console.log("Manual check - Checking activity:", activity);
      if (activity.time === formattedCurrentTime) {
        console.log(`Manual check - Activity time matches: ${activity.name}`);
        Toastify({
          text: `Reminder: ${activity.name} activity is due!`,
          duration: 5000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#4CAF50",
        }).showToast();
      }
    });
  };

  const handleCheck = async (activityId, isChecked) => {
    if (!isChecked) return;

    const updatedActivities = activities.map(activity => {
      if (activity._id === activityId) {
        return { ...activity, checked: isChecked };
      }
      return activity;
    });

    setActivities(updatedActivities);
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/home/add-activity">Add Activity</Link></li>
          <li><Link to="/home/near-you">Near You</Link></li>
          <li><Link to="/home/first-aid-help">First Aid Help</Link></li>
          <li><Link to="/home/view-pets">View Pets</Link></li>
        </ul>
      </nav>
      <h1>Home</h1>
      <h2>Activities</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity._id} className={activity.checked ? 'strikethrough' : ''}>
            <input 
              type="checkbox" 
              id={activity._id} 
              name={activity.name} 
              checked={activity.checked || false}
              onChange={(e) => handleCheck(activity._id, e.target.checked)}
            />
            <label htmlFor={activity._id}>{activity.name} at {activity.time}</label>
          </li>
        ))}
      </ul>
      <button onClick={manualCheckActivityTimes}>Manual Check Reminders</button>
      <Routes>
        <Route path="add-activity" element={<AddActivity onAddActivity={addNewActivity} />} />
        <Route path="near-you" element={<NearYou />} />
        <Route path="first-aid-help" element={<FirstAidHelp />} />
        <Route path="view-pets" element={<ViewPet />} />
      </Routes>
    </div>
  );
};

export default Home;
