import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchActivities, createActivity, deleteActivity } from "../utils/HandleAPIs";
import AddActivity from "./AddActivity";
import NearYou from "./NearYou";
import FirstAidHelp from "./FirstAidHelp";
import ViewPet from "./ViewPet";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../styles/Home.css";
import Navbar from "./Navbar";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetchActivities();
        console.log("Fetched activities:", response);
        setActivities(response);
        setFilteredActivities(response);
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
        if (activity.time === formattedCurrentTime) {
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
    }, 60000); 

    return () => clearInterval(checkActivityTimes);
  }, [activities]);

  useEffect(() => {
    filterActivities();
  }, [filterStatus, activities]);

  const filterActivities = () => {
    let filtered = activities;
    if (filterStatus !== "all") {
      filtered = filtered.filter(activity => (filterStatus === "completed" ? activity.checked : !activity.checked));
    }
    setFilteredActivities(filtered);
  };

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
      if (activity.time === formattedCurrentTime) {
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

  const completedCount = filteredActivities.filter(activity => activity.checked).length;
  const totalCount = filteredActivities.length;
  const progress = totalCount ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="home-page">
      <Navbar />
      <main className="content">
        <h1>Welcome to PetPocket!</h1>
        <p>Check up on all the tasks you need to do and also view your progress</p>

        <div className="filters">
          <label htmlFor="activity-filter">Filter Activities:</label>
          <select
            id="activity-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div className="progress-bar-container">
          <p>Progress: {completedCount} of {totalCount} activities completed</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2>Activities</h2>
        <ul className="activity-list">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => (
              <li key={activity._id}>
                <p style={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    id={activity._id} 
                    name={activity.name} 
                    checked={activity.checked || false}
                    onChange={(e) => handleCheck(activity._id, e.target.checked, activity.type)}
                  />
                  {activity.name} at {activity.time}
                </p>
              </li>
            ))
          ) : (
            <p>No activities to display</p>
          )}
        </ul>

        <button className="manual-check-btn" onClick={manualCheckActivityTimes}>Manual Check Reminders</button>

        <Routes>
          <Route path="add-activity" element={<AddActivity onAddActivity={addNewActivity} />} />
          <Route path="near-you" element={<NearYou />} />
          <Route path="first-aid-help" element={<FirstAidHelp />} />
          <Route path="view-pet" element={<ViewPet />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;