import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinRoomModal = ({ onClose }) => {
  const [roomKey, setRoomKey] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms/join`,
        { roomKey, username }
      );

      if (res.data.success) {
        const { topic, creator } = res.data.room;

        localStorage.setItem(
          "roomData",
          JSON.stringify({
            username,
            topic,
            roomKey,
          })
        );

        navigate(`/rooms/${roomKey}`, { state: { username, topic, creator } });
        onClose();
      } else {
        setError("Room not found or incorrect code.");
      }
    } catch (err) {
      setError("An error occurred while joining the room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-6 md:p-8 rounded-md shadow-lg w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#00334D]">
          Join Room
        </h2>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Room Key:</label>
            <input
              type="text"
              value={roomKey}
              onChange={(e) => setRoomKey(e.target.value)}
              required
              placeholder="Enter room key"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#00334D] rounded-md shadow-md hover:bg-[#002533]"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Room"}
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

export default JoinRoomModal;
