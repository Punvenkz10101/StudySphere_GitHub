const socket = io('https://studysphere-w27w.onrender.com', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://study-sphere-tau.vercel.app"
  }
});

export default socket; 