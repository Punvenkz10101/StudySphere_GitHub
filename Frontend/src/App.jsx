// frontend/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Features from './components/Features.jsx';
import CTA_Section from './components/CTA_Section.jsx';
import Team from './components/Team.jsx';
import FAQSection from './components/FAQSection.jsx';
import Footer from './components/Footer.jsx';
import Overlay from './components/Overlay.jsx';

import RoomPage from './components/RoomPage.jsx';
import ContactUs from './components/ContactUs.jsx';

import 'aos/dist/aos.css';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
import { Analytics } from "@vercel/analytics/react"

function App() {
 

  return (
    <div className="overflow-x-hidden">
      
      

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
             { <Overlay /> }
      
              
                <Features />
                <Team />
                <FAQSection />
                <Footer />
              </>
            }
          />
          <Route path="/rooms/:roomKey" element={<RoomPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </ErrorBoundary>
      <ToastContainer />
      <Analytics />
    </div>
  );
}

export default App;
