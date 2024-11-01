// App.js
import React from 'react';
import './app.css';
import Hero from './components/Hero';
import Features from './components/Features';
import DeveloperSection from './components/DeveleporSection';
import Footer from './components/Footer';




function App() {
  return (
    <div>
      <Header />
      <Hero/>
      <Features/>
      <div className="min-h-screen bg-gray-50">
      <DeveloperSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
