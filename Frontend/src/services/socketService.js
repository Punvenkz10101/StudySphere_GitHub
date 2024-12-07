import io from 'socket.io-client';

<<<<<<< HEAD
class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:5001', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });
    }
    return this.socket;
  }
=======
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
>>>>>>> parent of 580afce (Merge branch 'atul-check')

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService; 