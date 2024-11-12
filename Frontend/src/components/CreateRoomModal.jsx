// CreateRoomModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoomModal = ({ onClose }) => {
  /**
   * CreateRoomModal component
   * 
   * Handles creating a new room and submitting it to the backend
   * 
   * @param {function} onClose - function to close the modal
   * @returns {React.Component} - the CreateRoomModal component
   */
  const [creator, setCreator] = useState('');
  const [topic, setTopic] = useState('');
  const [participantsLimit, setParticipantsLimit] = useState(1);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /**
     * Handle form submission
     * @param {Event} e - the form submission event
     */
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/rooms/create', {
        creator,
        topic,
        participantsLimit,
      });

      if (res.data.success) {
        console.log("Room created:", res.data.room);
        onClose(); // Close modal after successful creation
        navigate(`/rooms/${res.data.room.roomKey}`); // Navigate to RoomPage with roomKey
      } else {
        console.error("Failed to create room");
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            Creator:
            <input 
              type="text" 
              value={creator} 
              onChange={(e) => setCreator(e.target.value)} 
              required 
              placeholder="Enter creator name" 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Topic:
            <input 
              type="text" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              required 
              placeholder="Enter room topic" 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Participants Limit (1-10):
            <input 
              type="number" 
              value={participantsLimit} 
              onChange={(e) => setParticipantsLimit(Math.min(10, Math.max(1, e.target.value)))} 
              required 
              placeholder="Set limit (1-10)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <button type="submit" className="w-full py-3 text-white bg-[#00334D] rounded-md shadow-md hover:bg-[#002533]">
            Create Room
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-black">Close</button>
      </div>
    </div>
  );
};

export default CreateRoomModal;
