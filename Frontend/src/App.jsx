import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; // <-- Correct import
import "./App.css";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import CTA_Section from "./components/CTA_Section";
import Team from "./components/Team";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import CreateRoomModal from "./components/CreateRoomModal";
import RoomPage from "./components/RoomPage";

function App() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- useLocation hook

  const toggleCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  // Check if the current route is NOT the RoomPage
  const isRoomPage = location.pathname.startsWith("/rooms/");

  return (
    <div className="overflow-x-hidden">
      {/* Render Overlay only if it's not the RoomPage */}
      {!isRoomPage && <Overlay />}

      {/* Conditional rendering for Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={toggleCreateRoomModal} navigate={navigate} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection onCreateRoomClick={toggleCreateRoomModal} />
              <CTA_Section />
              <Features />
              <Team />
              <FAQSection />
              <Footer />
            </>
          }
        />
        <Route path="/rooms/:roomKey" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
