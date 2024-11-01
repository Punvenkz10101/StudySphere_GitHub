// Features.js
import React from 'react';
import { FaUsers, FaClock, FaChartBar } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

function Features() {
  const featuresData = [
    {
      title: "Real-Time Collaboration",
      description: "Engage with your team using real-time tools.",
      icon: <FaUsers />,
    },
    {
      title: "Pomodoro Timer",
      description: "Boost productivity with our built-in Pomodoro session timer.",
      icon: <FaClock />,
    },
    {
      title: "Progress Tracker",
      description: "Track your progress effortlessly with our dashboard.",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-darkGray items-center gap-5 sm:gap-10 p-4 sm:p-8 max-sm:flex-col ">
      {featuresData.map((item, idx) => (
        <FeatureCard key={idx} title={item.title} desc={item.description} icon={item.icon} />
      ))}
    </div>
  );
}

export default Features;
