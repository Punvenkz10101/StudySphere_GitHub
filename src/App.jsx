// App.js
import React from 'react';
import './app.css';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section'; // Import the new Cta component

function App() {
  return (
    <div>
      <Hero />
      <CTA_Section /> {/* Add the Cta component here */}
      <Features />
      
    </div>
  );
}

export default App;
