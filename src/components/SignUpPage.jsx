import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./Firebase/firebase"; // Import the initialized auth
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupPage = () => {
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
      setError(""); // Clear previous errors
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);

      // You can store additional user data (like name) in Firestore if needed

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg w-80 max-xl:h-screen max-xl:w-screen">
        <h2 className="text-2xl font-semibold text-primary text-center mb-6">Sign Up</h2>

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

        {error && (
          <p className="mt-2 text-center text-red-500">{error}</p>
        )}

        <button type="submit" className="w-full py-3 mt-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark">
          Sign Up
        </button>

        <Link to="/signin" className="block mt-4 text-primary text-center hover:underline">
          Back to Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
