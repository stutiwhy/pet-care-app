// src/components/FirstAidHelp.jsx
import React from "react";
import { Link } from "react-router-dom";

const FirstAidHelp = () => {
  const tips = [
    {
      title: "Choking",
      description: "If your pet is choking, try to clear their airway. If they are still choking, seek immediate veterinary help."
    },
    {
      title: "Bleeding",
      description: "Apply gentle pressure to the wound to stop the bleeding. Keep your pet calm and seek veterinary assistance."
    },
    {
      title: "Burns",
      description: "Cool the burn area with lukewarm water and cover it with a clean cloth. Do not apply ice. Seek veterinary care."
    },
    {
      title: "Poisoning",
      description: "If you suspect your pet has ingested something toxic, contact your vet immediately or call a pet poison hotline."
    },
    {
      title: "Fractures",
      description: "Keep the injured area immobilized and avoid moving your pet. Transport them to a vet as soon as possible."
    }
  ];

  return (
    <div>
        <ul>
          <li><Link to="/add-activity">Add Activity</Link></li>
          <li><Link to="/near-you">Near You</Link></li>
          <li><Link to="/first-aid-help">First Aid Help</Link></li>
          <li><Link to="/view-pets">View Pets</Link></li>
        </ul>
      <h1>First Aid Help</h1>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>
            <h2>{tip.title}</h2>
            <p>{tip.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirstAidHelp;
