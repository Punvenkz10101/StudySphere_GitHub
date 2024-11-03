import React, { useState } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
// preventing default and waitng for response from api
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

    
    setError("");

  // using api for fututre storing of id passwords
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="id='Signin' flex items-center justify-center min-h-screen ">
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

        <a href="#" className="block mt-4 text-primary text-center hover:underline">
          Don't have an account? Sign up
        </a>
      </form>
    </div>
  );
};
  

// content-->
// we might have to use ract routes and switch to link them
export default SigninPage;

