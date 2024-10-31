// FeatureCard.js
import React from 'react';

function FeatureCard({ title, desc, icon }) {
  return (
    <div
      className={`box aspect-square p-6 bg-CardGray text-white rounded-lg transform transition duration-300 w-1/4 h-40 hover:scale-110 hover:shadow-lg hover:border-cyan-100 hover:border-2  hover:bg-FeatureGray flex flex-col items-center justify-center max-sm:w-5/6 max-sm:h-40 max-sm:hover:scale-110`}
    >
      <div className="text-white mt-6  text-5xl ">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

export default FeatureCard;
