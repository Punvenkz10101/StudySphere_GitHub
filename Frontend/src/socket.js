import { io } from 'socket.io-client';

const socket = io('wss://studysphere-w27w.onrender.com'); // Backend server URL

// Action function to emit events
export const joinRoom = (roomKey, username) => {
  socket.emit('joinRoom', { roomKey, username });
};

export const sendMessage = (message, roomKey) => {
  socket.emit('sendMessage', { message, roomKey });
};

export const startPomodoro = (roomKey) => {
  socket.emit('startPomodoro', { roomKey });
};

export const stopPomodoro = (roomKey) => {
  socket.emit('stopPomodoro', { roomKey });
};

export const addTask = (task, roomKey) => {
  socket.emit('addTask', { task, roomKey });
};

export const editTask = (task, roomKey) => {
  socket.emit('editTask', { task, roomKey });
};

export const deleteTask = (taskId, roomKey) => {
  socket.emit('deleteTask', { taskId, roomKey });
};

// Event listener for messages or task updates
export const listenToMessages = (callback) => {
  socket.on('receiveMessage', callback);
};

export const listenToPomodoroStatus = (callback) => {
  socket.on('pomodoroStatus', callback);
};

export const listenToTasks = (callback) => {
  socket.on('taskUpdated', callback);
};