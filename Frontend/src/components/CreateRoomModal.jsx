import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from '../components/Firebase/firebase.js';
import SigninPage from "./SignInPage.jsx";


const CreateRoomModal = ({ onClose }) => {
  const [creator, setCreator] = useState("");
  const [topic, setTopic] = useState("");
  const [participantsLimit, setParticipantsLimit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
       // Access username or email
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creator || !topic || participantsLimit < 1 || participantsLimit > 10) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms/create`,
        { creator, topic, participantsLimit }
      );

      if (res.data.success) {
        const roomKey = res.data.room.roomKey;

        localStorage.setItem(
          "roomData",
          JSON.stringify({
            creator,
            topic,
            roomKey,
          })
        );

        navigate(`/rooms/${roomKey}`, { state: { creator, topic } });
        onClose();
      } else {
        setError("Failed to create room.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
   if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <SigninPage
          onClose={onClose}
          
        />
      </div>
    );
  }

  return (  
    
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-6 md:p-8 rounded-md shadow-lg w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#00334D]">
          Create Room
        </h2>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Creator:</label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              required
              placeholder="Enter creator name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              placeholder="Enter room topic"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Participants Limit (1-10):
            </label>
            <input
              type="number"
              value={participantsLimit}
              onChange={(e) =>
                setParticipantsLimit(
                  Math.min(10, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#00334D] rounded-md shadow-md hover:bg-[#002533]"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-black block w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateRoomModal;
