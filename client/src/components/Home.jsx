// src/components/Home.js

import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { fetchActivities, createActivity, deleteActivity } from "../utils/HandleAPIs";
import AddActivity from "./AddActivity";
import NearYou from "./NearYou";
import FirstAidHelp from "./FirstAidHelp";
import ViewPet from "./ViewPet";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../styles/Home.css";

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

  const addNewActivity = async (newActivity) => {
    try {
      const savedActivity = await createActivity(newActivity);
      setActivities(prevActivities => [...prevActivities, savedActivity]);
    } catch (error) {
      console.error("There was an error saving the activity!", error);
      Toastify({
        text: "Error saving activity.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#F44336",
      }).showToast();
    }
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

  const handleCheck = async (activityId, isChecked, activityType) => {
    if (isChecked) {
      if (activityType === "one-time") {
        try {
          await deleteActivity(activityId);
          setActivities(prevActivities => prevActivities.filter(activity => activity._id !== activityId));
          Toastify({
            text: "One-time activity completed and deleted!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
          }).showToast();
        } catch (error) {
          console.error("There was an error deleting the activity!", error);
          Toastify({
            text: "Error deleting activity.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#F44336",
          }).showToast();
        }
      } else {
        const updatedActivities = activities.map(activity => {
          if (activity._id === activityId) {
            return { ...activity, checked: isChecked };
          }
          return activity;
        });

        setActivities(updatedActivities);
        Toastify({
          text: `Recurring activity "${updatedActivities.find(activity => activity._id === activityId).name}" checked off.`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#2196F3",
        }).showToast();
      }
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/add-activity">Add Activity</Link></li>
          <li><Link to="/near-you">Near You</Link></li>
          <li><Link to="/first-aid-help">First Aid Help</Link></li>
          <li><Link to="/view-pet">View Pet</Link></li>
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
              onChange={(e) => handleCheck(activity._id, e.target.checked, activity.type)}
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
        <Route path="view-pet" element={<ViewPet />} />
      </Routes>
    </div>
  );
};

export default Home;
