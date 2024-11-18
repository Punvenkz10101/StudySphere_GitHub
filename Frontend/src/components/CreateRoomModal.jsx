import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoomModal = ({ onClose }) => {
  const [creator, setCreator] = useState('');
  const [topic, setTopic] = useState('');
  const [participantsLimit, setParticipantsLimit] = useState(1);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(''); // For error state
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before making the request
    if (!creator || !topic || participantsLimit < 1 || participantsLimit > 10) {
      setError('Please fill in all fields correctly.');
      return;
    }

    try {
      setLoading(true); // Start loading
      setError(''); // Reset previous error
      const res = await axios.post('http://localhost:5000/api/rooms/create', {
        creator,
        topic,
        participantsLimit,
      });

      if (res.data.success) {
        console.log('Room created:', res.data.room);
        onClose(); // Close modal after successful creation
        navigate(`/rooms/${res.data.room.roomKey}`); // Navigate to RoomPage with roomKey
      } else {
        setError('Failed to create room');
      }
    } catch (err) {
      console.error('Error creating room:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error message */}
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
              onChange={(e) => setParticipantsLimit(Math.min(10, Math.max(1, parseInt(e.target.value))))} 
              required 
              placeholder="Set limit (1-10)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <button 
            type="submit" 
            className="w-full py-3 text-white bg-[#00334D] rounded-md shadow-md hover:bg-[#002533]" 
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating...' : 'Create Room'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-black">Close</button>
      </div>
    </div>
  );
};

export default CreateRoomModal;
