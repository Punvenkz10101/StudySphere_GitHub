import React, { useState, useEffect } from 'react';
import { auth } from '../components/Firebase/firebase.js';
import Header from '../components/Header.jsx';
import SigninPage from '../components/SignInPage.jsx';
import SignupPage from '../components/SignUpPage.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Overlay = ({ socket }) => {
  const [user, setUser] = useState(null); // User state
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    // Check for saved room on component mount
    const savedRoom = localStorage.getItem('currentRoom');
    if (savedRoom) {
      setIsReconnecting(true);
      // Attempt to rejoin the room
      socket.emit('joinRoom', savedRoom, (response) => {
        if (response.success) {
          setIsReconnecting(false);
        } else {
          // Handle failed reconnection
          localStorage.removeItem('currentRoom');
          setIsReconnecting(false);
          // Show error message or redirect to home
        }
      });
    }
  }, [socket]);

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
       toast.warning("Sign Out Successfully")
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  return (
    <div>
      <Header 
        onLoginClick={toggleSigninOverlay} 
        onSignUpClick={toggleSignupOverlay} 
        user={user} // Pass the user state to Header
        onSignOut={handleSignOut} 
      />

      {/* Signin Overlay */}
      {showSignin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SigninPage onClose={toggleSigninOverlay} toggleSignupOverlay={toggleSignupOverlay} />
        </div>
      )}

      {/* Signup Overlay */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignupPage onClose={toggleSignupOverlay} toggleSigninOverlay={toggleSigninOverlay} />
        </div>
      )}

      {isReconnecting && (
        <div className="overlay">
          <div className="reconnecting-message">
            <h2>Reconnecting...</h2>
            <p>Attempting to rejoin your previous room</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Overlay
