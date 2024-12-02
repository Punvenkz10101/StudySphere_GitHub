import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === 'production' 
  ? process.env.VITE_SOCKET_URL 
  : 'http://localhost:5001';

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const socketService = {
  socket,
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  emit: (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  },
  on: (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  },
  off: (event) => {
    if (socket) {
      socket.off(event);
    }
  },
};

export default socketService; 