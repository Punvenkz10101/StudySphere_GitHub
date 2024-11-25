import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    return this.socket;
  }

  createRoom(roomData) {
    if (this.socket) {
      this.socket.emit('createRoom', roomData);
    }
  }

  joinRoom(roomKey, username) {
    if (this.socket) {
      this.socket.emit('joinRoom', { roomKey, username });
    }
  }

  addTask(roomKey, task) {
    if (this.socket) {
      this.socket.emit('addTask', { roomKey, task });
    }
  }

  deleteTask(roomKey, taskId) {
    if (this.socket) {
      this.socket.emit('deleteTask', { roomKey, taskId });
    }
  }

  editTask(roomKey, taskId, newText) {
    if (this.socket) {
      this.socket.emit('editTask', { roomKey, taskId, newText });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService(); 