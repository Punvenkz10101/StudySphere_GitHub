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
    <div>
      <Hero />
      <CTA_Section /> 
      <Features />
      <Team />
      <FAQSection/>
      <Footer />

    </div>
  );
}

export default App;
