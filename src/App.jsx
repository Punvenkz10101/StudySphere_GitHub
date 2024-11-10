import React, { useState, useEffect } from 'react';
import './app.css';
import { auth } from './components/Firebase/firebase'; // Import Firebase authentication
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import CTA_Section from './components/CTA_Section';
import Team from './components/Team';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SigninPage from './components/SignInPage';
import SignupPage from './components/SignUpPage';

function App() {
  const [user, setUser] = useState(null); // User state
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Listen to Firebase auth state changes
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

  return (
    <div className='overflow-x-hidden'>
      <Header 
        onLoginClick={toggleSigninOverlay} 
        onSignUpClick={toggleSignupOverlay} 
        user={user} // Pass the user state to Header
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
  );
}

export default App;


