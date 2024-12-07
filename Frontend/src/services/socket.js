const socket = io('https://studysphere-github.onrender.com', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://study-sphere-tau.vercel.app"
  }
}); 