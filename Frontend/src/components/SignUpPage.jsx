import React, { useState } from "react";
import { auth } from "./Firebase/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

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
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        className: "bg-[#00334D] text-white",
      });
      onClose();
    } catch (error) {
      setError(error.message);
      toast.error("Failed to create account. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        className: "bg-[#00334D] text-white",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      toast.success("Signed in with Google successfully!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        className: "bg-[#00334D] text-white",
      });
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
      toast.error("Failed to sign in with Google. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        className: "bg-[#00334D] text-white",
      });
    }
  };

  return (
    <div className="bg-white relative rounded-lg p-8 shadow-lg w-80 max-w-md">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
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
        className="w-full py-3 mt-4 bg-[#00334D] text-white font-semibold rounded-md hover:bg-[#002836]"
      >
        Sign Up
      </button>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 flex items-center justify-center"
      >
        <img src="/gmail.jpeg" alt="Google Logo" className="w-5 h-5 mr-2" />
        Sign up with Google
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <button
          onClick={() => {
            onClose();
            toggleSigninOverlay();
          }}
          className="text-[#00334D] hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
