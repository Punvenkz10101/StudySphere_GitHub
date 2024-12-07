// frontend/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import HeroSection from './components/HeroSection.jsx';
import Features from './components/Features.jsx';
import CTA_Section from './components/CTA_Section.jsx';
import Team from './components/Team.jsx';
import FAQSection from './components/FAQSection.jsx';
import Footer from './components/Footer.jsx';
import Overlay from './components/Overlay.jsx';
import CreateRoomModal from './components/CreateRoomModal.jsx';
import JoinRoomModal from './components/JoinRoomModal.jsx';
import RoomPage from './components/RoomPage.jsx';
import ContactUs from './components/ContactUs.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  const toggleJoinRoomModal = () => {
    setShowJoinRoom(!showJoinRoom);
  };

  const isRoomPage = location.pathname.startsWith('/rooms/');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      {!isRoomPage && <Overlay />}
      
      {/* Render Modals */}
      {showCreateRoom && <CreateRoomModal onClose={toggleCreateRoomModal} navigate={navigate} />}
      {showJoinRoom && <JoinRoomModal onClose={toggleJoinRoomModal} navigate={navigate} />}

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection onCreateRoomClick={toggleCreateRoomModal} onJoinRoomClick={toggleJoinRoomModal} />
                <CTA_Section />
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
