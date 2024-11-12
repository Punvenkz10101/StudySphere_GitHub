import React, { useState} from 'react';
import './app.css';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section';
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import CreateRoomModal from './components/CreateRoomModal'; // Import CreateRoomModal

function App() {
  const [showCreateRoom, setShowCreateRoom] = useState(false); // State for showing Create Room modal
 const toggleCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };
  return (
    <div className="overflow-x-hidden">
      <Overlay/>
      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={toggleCreateRoomModal} />
      )}

      <section id="hero">
        <HeroSection onCreateRoomClick={toggleCreateRoomModal} />
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
