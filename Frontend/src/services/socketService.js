import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://studysphere-github.onrender.com';

const socket = io(SOCKET_URL, {
  transports: ['polling', 'websocket'],
  secure: true,
  rejectUnauthorized: false,
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

const socketService = {
  socket,
  connect: () => {
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  },
  disconnect: () => socket.disconnect(),
  emit: (event, data) => {
    if (socket && socket.connected) {
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