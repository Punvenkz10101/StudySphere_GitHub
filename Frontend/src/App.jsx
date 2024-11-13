import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic routing
import './app.css';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section';
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import CreateRoomModal from './components/CreateRoomModal'; // Import CreateRoomModal
import RoomPage from './components/RoomPage';

function App() {
  const [showCreateRoom, setShowCreateRoom] = useState(false); // State for showing Create Room modal
  const navigate = useNavigate(); // Get the navigate function to redirect after room creation

  const toggleCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  return (
    <div className="overflow-x-hidden">
      <Overlay />
      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={toggleCreateRoomModal} navigate={navigate} /> // Pass navigate to modal
      )}
      <Routes>
        <Route path="/" element={
          <>         
              <HeroSection onCreateRoomClick={toggleCreateRoomModal} />           
            <div className="bg-gray-400 h-[3px] w-full" />           
              <CTA_Section />          
            <div className="bg-gray-400 h-[3px] w-full" />          
              <Features />           
            <div className="bg-gray-400 h-[3px] w-full" />           
              <Team />          
            <div className="bg-gray-400 h-[3px] w-full" />           
              <FAQSection />
            <div className="bg-gray-400 h-[3px] w-full" />
            <Footer />
          </>
        } />
        <Route path="/rooms/:roomKey" element={<RoomPage />} /> {/* RoomPage with dynamic roomKey */}
      </Routes>
    </div>
  );
}

export default App;
