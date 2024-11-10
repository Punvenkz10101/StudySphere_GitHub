// frontend/src/components/RoomPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function RoomPage() {
  const { roomKey } = useParams();

  return (
    <div className="room-page">
      <h1>Room Key: {roomKey}</h1>
      <p>Share this key with friends to join the room.</p>
    </div>
  );
}
