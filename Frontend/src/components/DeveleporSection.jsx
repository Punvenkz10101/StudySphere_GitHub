import React from 'react';
import DeveloperCard from './DeveloperCard';

const DeveloperSection = () => {
  const developers = [
    {
      image: '/Puneeth.jpeg', // Image path in the public folder
      name: 'Puneeth Venkat',
      description: 'FrontEnd Developer',
      github: 'https://github.com/Punvenkz10101',
      linkedin: 'https://www.linkedin.com/in/puneeth-venkat-7731b5293',
    },
    {
      image: '/Bharath.jpeg', // Image path in the public folder
      name: 'Bharath P',
      description: 'Backend Developer',
      github: 'https://github.com/Bharathpothula205',
      linkedin: 'http://linkedin.com/in/bharath-pothula',
    },
    {
      image: '/HarshImage.jpg', // Image path in the public folder
      name: 'Harsha SM',
      description: 'Full Stack Developer',
      github: 'https://github.com/charlie',
      linkedin: 'https://linkedin.com/in/charlie',
    },
    {
      image: '/jjImage.jpg', // Image path in the public folder
      name: 'D',
      description: 'CEO',
      github: 'https://github.com/diana',
      linkedin: 'https://linkedin.com/in/diana',
    },
  ];

  return (
    <section className="py-12 bg-gray-500">
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
