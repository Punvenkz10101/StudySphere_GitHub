// App.js
import React from 'react';
import './app.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section'; 
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className=' overflow-hidden'>
      <Header /> {/* Header moved outside HeroSection */} //fixed

      <section id="hero">
        <HeroSection />
      </section>
      <div className="bg-gray-400 h-[6px] w-full" />

      <section id="cta">
        <CTA_Section /> 
      </section>
      <div className="bg-gray-400 h-[6px] w-full" />

      <section id="features">
        <Features />
      </section>
      <div className="bg-gray-400 h-[6px] w-full" />

      <section id="team">
        <Team />
      </section>
      <div className="bg-gray-400 h-[6px] w-full" />

      <section id="faq">
        <FAQSection />
      </section>
      <div className="bg-gray-400 h-[6px] w-full" />

      <Footer />
    </div>
  );
}

export default App;
