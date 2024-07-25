// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import AddActivity from './components/AddActivity';
import NearYou from './components/NearYou';
import FirstAidHelp from './components/FirstAidHelp';
import ViewPet from './components/ViewPet';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/near-you" element={<NearYou />} />
        <Route path="/first-aid-help" element={<FirstAidHelp />} />
        <Route path="/view-pets" element={<ViewPet />} />
      </Routes>
    </Router>
  );
};

export default App;
