import React from 'react';

const DeveloperCard = ({ image, name,description, github, linkedin }) => {
  return (
    <div className="max-w-xs bg-white shadow rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
      <img className="w-full h-40 object-cover" src={image} alt={`${name}`} />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-3 flex justify-center space-x-3">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg className="h-5 w-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              {/* GitHub Icon Path */}
              <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.1 11.4.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.2-1.2-1.6-1.2-1.6-.9-.6 0-.6.1-.6.9.1 1.5.9 1.5.9.8 1.5 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2.6-.3-5.2-1.4-5.2-6.1 0-1.4.5-2.5 1.2-3.3-.1-.3-.5-1.4.1-3 0 0 1-.3 3.2 1.2a10.8 10.8 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.7.1 3 .7.8 1.2 1.9 1.2 3.3 0 4.7-2.6 5.8-5.2 6.1.3.3.5.8.5 1.6v2.3c0 .3.2.6.8.5C20.6 21.8 24 17.3 24 12 24 5.4 18.6 0 12 0z" />
            </svg>
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="h-5 w-5 text-blue-600 hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24">
              {/* LinkedIn Icon Path */}
              <path d="M20.4 3H3.6C2.7 3 2 3.7 2 4.6v14.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6zM8 19.5H5V10h3v9.5zM6.5 8.5C5.7 8.5 5 7.8 5 7s.7-1.5 1.5-1.5S8 6.2 8 7s-.7 1.5-1.5 1.5zM19 19.5h-3v-4.5c0-1.1-.4-1.7-1.3-1.7s-1.5.6-1.5 1.7v4.5h-3V10h3v1.3c.4-.7 1.4-1.2 2.3-1.2 1.8 0 3 1.1 3 3.4v6z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
