// App.js
import React from 'react';
import './app.css';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section'; 
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';



function App() {
  return (
    <div className='h-screen w-screen overflow-x-hidden'>
      <Hero />
      <div className="bg-gray-400 h-[6px] w-full" />
      <CTA_Section /> 
      <div className="bg-gray-400 h-[6px] w-full" />
      <Features />
      <div className="bg-gray-400 h-[6px] w-full" />
      <Team />
      <div className="bg-gray-400 h-[6px] w-full" />
      <FAQSection/>
      {/* <div className="bg-gray-400 h-[10px] w-full" /> */}
      <Footer />
      

    </div>
  );
}

export default App;
