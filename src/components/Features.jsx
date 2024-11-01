// Features.js
import React from 'react';
import { FaUsers, FaClock, FaChartBar } from 'react-icons/fa';

function FeatureCard({ title, desc, icon }) {
  return (
    <div
      className="aspect-square p-6 bg-[#00334D] text-[#F2F2F2] rounded-lg transform transition duration-300 w-1/4 h-40 hover:scale-110 hover:shadow-lg hover:border-[#00B2A9] hover:border-2 hover:bg-[#004466] flex flex-col items-center justify-center max-sm:w-5/6 max-sm:h-40 max-sm:hover:scale-110"
    >
      <div className="text-[#F2F2F2] mt-6 text-5xl">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

function Features() {
  const featuresData = [
    {
      title: "Real-Time Collaboration",
      desc: "Engage with your team using real-time tools.",
      icon: <FaUsers />,
    },
    {
      title: "Pomodoro Timer",
      desc: "Boost productivity with our built-in Pomodoro session timer.",
      icon: <FaClock />,
    },
    {
      title: "Progress Tracker",
      desc: "Track your progress effortlessly with our dashboard.",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-[#001D33] items-center gap-5 sm:gap-10 p-4 sm:p-8 max-sm:flex-col">
      {featuresData.map((item, idx) => (
        <FeatureCard key={idx} title={item.title} desc={item.desc} icon={item.icon} />
      ))}
    </div>
  );
}

export default Features;
