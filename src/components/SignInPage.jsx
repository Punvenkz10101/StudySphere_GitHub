import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from './Firebase/firebase'; // Import the firebase configuration
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import googleLogo from '../assets/gmail.jpeg' // Adjust the path as necessary

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("Please fill in both email and password.");
      return;
    } else if (!email) {
      setError("Please enter your email.");
      return;
    } else if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      // Handle Firebase error codes
      if (error.code === 'auth/user-not-found') {
        setError("Your account is not registered.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg w-80 max-xl:h-screen max-xl:w-screen">
        <h2 className="text-2xl font-semibold text-primary text-center mb-6">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />

        {error && (
          <p className="mt-2 text-center text-red-500">{error}</p>
        )}
        
        <button type="submit" className="w-full py-3 mt-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark">
          Sign In
        </button>

        <button 
          type="button" 
          onClick={handleGoogleSignIn} 
          className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 flex items-center justify-center"
        >
          <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>

        <Link to="/signup" className="block mt-4 text-primary text-center hover:underline">
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
};

export default SigninPage;
