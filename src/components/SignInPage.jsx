import React, { useState } from "react";
import { auth } from "./Firebase/firebase"; // Firebase configuration
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ImCross } from "react-icons/im";
import googleLogo from '../assets/gmail.jpeg'; // Path to your Google logo image

const SigninPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle email/password login
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
      onClose(); // Close overlay after successful sign-in
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

  // Handle Google sign-in
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
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

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

      {error && <p className="mt-2 text-center text-red-500">{error}</p>}

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
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
    </div>
  );
};

export default SigninPage;




