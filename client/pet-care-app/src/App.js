import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import AddActivity from './components/AddActivity';
import NearYou from './components/NearYou';
import FirstAidHelp from './components/FirstAidHelp';
import ViewPet from './components/ViewPet';

const App = () => {
  const [activities, setActivities] = useState([]);

  const addNewActivity = (newActivity) => {
    setActivities(prevActivities => [...prevActivities, newActivity]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home activities={activities} />} />
        <Route path="/add-activity" element={<AddActivity onAddActivity={addNewActivity} />} />
        <Route path="/near-you" element={<NearYou />} />
        <Route path="/first-aid-help" element={<FirstAidHelp />} />
        <Route path="/view-pets" element={<ViewPet />} />
      </Routes>
    </Router>
  );
};

export default App;
