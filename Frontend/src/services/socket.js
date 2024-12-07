import io from 'socket.io-client';

const SOCKET_URL = 'https://studysphere-github.onrender.com';

export const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
}); 