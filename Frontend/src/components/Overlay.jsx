import React, { useState, useEffect } from 'react';
import { auth } from '../components/Firebase/firebase.js';
import Header from '../components/Header.jsx';
import SigninPage from '../components/SignInPage.jsx';
import SignupPage from '../components/SignUpPage.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Overlay = () => {
  const [user, setUser] = useState(null); // User state
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
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

    </div>
  )
}

export default Overlay
