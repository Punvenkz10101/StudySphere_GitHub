import React, { useState } from "react";
import { auth } from "./Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ImCross } from "react-icons/im";

const SignupPage = ({ onClose }) => {
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
    </div>
  );
};

export default SignupPage;

