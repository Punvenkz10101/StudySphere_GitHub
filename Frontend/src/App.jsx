// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
import './app.css';
import { auth } from './components/Firebase/firebase';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section';
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SigninPage from './components/SignInPage';
import SignupPage from './components/SignUpPage';
import CreateRoomModal from './components/CreateRoomModal';
import RoomPage from './components/RoomPage'; // Import RoomPage

function App() {
  const [user, setUser] = useState(null);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const toggleSigninOverlay = () => {
    setShowSignin(!showSignin);
    setShowSignup(false); 
  };

  const toggleSignupOverlay = () => {
    setShowSignup(!showSignup);
    setShowSignin(false); 
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  return (
    <div className="overflow-x-hidden">
      <Header 
        onLoginClick={toggleSigninOverlay} 
        onSignUpClick={toggleSignupOverlay} 
        user={user}
        onSignOut={handleSignOut} 
      />

      {/* Signin Overlay */}
      {showSignin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SigninPage onClose={toggleSigninOverlay} />
        </div>
      )}

      {/* Signup Overlay */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupPage onClose={toggleSignupOverlay} />
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={toggleCreateRoomModal} />
      )}

      <Routes>
        <Route path="/" element={
          <>
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
          </>
        } />
        <Route path="/rooms" element={<RoomPage />} /> {/* Add RoomPage route */}
      </Routes>
    </div>
  );
}

export default App;
