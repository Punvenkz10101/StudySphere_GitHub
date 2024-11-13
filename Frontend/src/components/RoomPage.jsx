// RoomPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function RoomPage() {
  const { roomKey } = useParams();

  // Function to copy the room key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomKey);
    alert('Room key copied to clipboard!');
  };

  return (
    <div className="room-page p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Room Key: {roomKey}</h1>
      <p className="mb-4">Share this key with friends to join the room.</p>
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Copy Room Key
      </button>
    </div>
  );
}
