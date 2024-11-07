// App.js
import React from 'react';
import './app.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage'; 
import SignUpPage from './components/SignUpPage'; // Ensure path is correct

function App() {
  return (
   <>
      <Router>
      <Routes>
        {/* Default route to redirect from "/" to "/signin" */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
   </>
     
=======
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section'; 
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className='h-screen w-screen overflow-x-hidden'>
      <Header /> {/* Header moved outside HeroSection */}

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
>>>>>>> 552686cd1657d070e9b8d8027d1af7a7a78392cb
  );
}

export default App;
