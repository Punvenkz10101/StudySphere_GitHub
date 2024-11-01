import React from 'react';
import DeveloperCard from '../component/DeveleporCard';
import puneethImage from '../assets/puneeth.jpeg'
import BharathImage from '../assets/Bharath.jpeg'

const DeveloperSection = () => {
  const developers = [
    { image: puneethImage, name: 'Puneeth Venkat',description: 'FrontEnd Devele', github: 'https://github.com/Punvenkz10101', linkedin: 'www.linkedin.com/in/puneeth-venkat-7731b5293' },
    { image: BharathImage, name: 'Bharath P',description: 'Backend Develpr', github: 'https://github.com/Bharathpothula205', linkedin: 'http://linkedin.com/in/bharath-pothula' },
    { image: 'HarshImage', name: 'Harsha SM',description: 'Full Stack', github: 'https://github.com/charlie', linkedin: 'https://linkedin.com/in/charlie' },
    { image:'jjImage', name: 'D',description: 'CEO' ,github: 'https://github.com/diana', linkedin: 'https://linkedin.com/in/diana' },
  ];

  return (
    <section className="py-12 bg-green-500">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">Meet Our Developers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {developers.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
