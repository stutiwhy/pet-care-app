import React from 'react';
import { Link } from 'react-router-dom';
import './IntroductoryPage.css'; 
import { FaPaw } from 'react-icons/fa';

const IntroductoryPage = () => {
  return (
    <div className="intro-page">
      <div className="header">
        <div className="logo">
          <FaPaw size={40} color="#9a06d9" />
        </div>
        <div className="site-name">PetPocket</div>
      </div>
      <p className="intro-paragraph">
        Welcome to PetPocket! We're dedicated to providing you with all the tools and tips you need to ensure your furry friends are happy and healthy. Explore our site to discover how we can help you give your pets the best care possible.
      </p>
      <div className="container">
        <div className="box">
          <div className="box-text">About Us</div>
          <div className="description">We are a small team with our mission to enhance pet well-being.</div>
        </div>
        <div className="box">
          <div className="box-text">Our Goal</div>
          <div className="description">Our primary goal is to aim to achieve for the betterment of pets everywhere.</div>
        </div>
        <div className="box">
          <div className="box-text">Services We Provide</div>
          <div className="description">This site(idk)</div>
        </div>
      </div>
      <p className="additional-paragraph">
        Join us on this journey to improve your pet's lifestyle! At PetPocket, we believe that every pet deserves the best care, and we're here to help you make that happen. Let's work together to ensure your furry friends live their happiest and healthiest lives.
      </p>
      <Link to="/sign-in" className="get-started-btn">
        Get Started
      </Link>
    </div>
  );
};

export default IntroductoryPage;
