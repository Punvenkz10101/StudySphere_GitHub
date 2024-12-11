import React, { useState } from "react";
import { auth } from "./Firebase/firebase"; // Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

const SigninPage = ({ onClose, toggleSignupOverlay }) => {
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

    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        className: "bg-[#00334D] text-white",
      });
      onClose();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Your account is not registered.");
        toast.error("Account not found. Please register first.", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          className: "bg-[#00334D] text-white",
        });
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
        toast.error("Incorrect password. Try again!", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          className: "bg-[#00334D] text-white",
        });
      } else {
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          className: "bg-[#00334D] text-white",
        });
      }
    }
  };

  return (
    <div id="signIn" className="bg-white relative rounded-lg p-8 shadow-lg w-80 max-w-md">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
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
        className="w-full py-3 mt-4 bg-[#00334D] text-white font-semibold rounded-md hover:bg-[#002836]"
      >
        Sign In
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <button
          onClick={() => {
            onClose();
            toggleSignupOverlay();
          }}
          className="text-blue-500 hover:underline"
        >
          Create Account
        </button>
      </p>
    </div>
  );
};

export default SigninPage;
