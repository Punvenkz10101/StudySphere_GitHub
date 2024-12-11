import React, { useState, useEffect } from 'react';
import { auth } from '../components/Firebase/firebase.js';
import Header from '../components/Header.jsx';
import SigninPage from '../components/SignInPage.jsx';
import SignupPage from '../components/SignUpPage.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CTA_Section from './CTA_Section.jsx';
import CreateRoomModal from "./CreateRoomModal.jsx";
import JoinRoomModal from "./JoinRoomModal.jsx";
import HeroSection from './HeroSection.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';

const Overlay = () => {
  const [user, setUser] = useState(null); 
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
      toast.warning("Sign Out Successfully", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        style: {
          backgroundColor: '#00334D',
          color: 'white',
          borderRadius: '10px',
          padding: '10px'
        }
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <Header 
        onLoginClick={toggleSigninOverlay} 
        onSignUpClick={toggleSignupOverlay} 
        user={user} 
        onSignOut={handleSignOut} 
      />
      {showCreateRoom && <CreateRoomModal onClose={toggleCreateRoomModal} toggleSignupOverlay={toggleSignupOverlay} navigate={navigate} />}
      {showJoinRoom && <JoinRoomModal onClose={toggleJoinRoomModal} toggleSignupOverlay={toggleSignupOverlay} navigate={navigate} />}
      
      <HeroSection onCreateRoomClick={toggleCreateRoomModal} onJoinRoomClick={toggleJoinRoomModal} />
      
      {showSignin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SigninPage onClose={toggleSigninOverlay} toggleSignupOverlay={toggleSignupOverlay} />
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupPage onClose={toggleSignupOverlay} toggleSigninOverlay={toggleSigninOverlay} />
        </div>
      )}
      
      <CTA_Section onSignInClick={toggleSigninOverlay} onSignUpClick={toggleSignupOverlay} />
      <ToastContainer />
    </div>
  );
};

export default Overlay;
