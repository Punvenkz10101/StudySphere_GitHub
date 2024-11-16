import React, { useState } from "react";
import { auth } from "./Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ImCross } from "react-icons/im";
import googleLogo from '../assets/Images/HomePage/gmail.jpeg'; // Path to your Google logo image
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import GoogleAuthProvider

const SignupPage = ({ onClose, toggleSigninOverlay }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !repeatPassword) {
      setError("Please fill in all fields.");
      return;
    } else if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError(""); 
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
      onClose(); // Close overlay on successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      onClose(); // Close overlay after successful Google sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-80 max-w-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        <ImCross />
      </button>
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
      />

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

      <input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
      />

      {error && <p className="mt-2 text-center text-red-500">{error}</p>}

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 flex items-center justify-center"
      >
        <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
        Sign up with Google
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <button
          onClick={() => {
            onClose(); // Close the sign-up overlay
            toggleSigninOverlay(); // Open the sign-in overlay
          }}
          className="text-blue-500 hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
