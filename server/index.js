// const cors = require('cors');

// // Define allowed origins
// const allowedOrigins = [
//     'https://study-sphere-git-hub.vercel.app',
//     'http://localhost:5173',
//     'http://localhost:3000',
//     // Allow all Vercel preview deployments
//     /^https:\/\/study-sphere-git-.*\.vercel\.app$/
// ];

// // Update CORS middleware
// app.use(cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,POST,PUT,DELETE', // Adjust as per your needs
//     credentials: true, // Include if you're using cookies or authentication
//   }));
// Make sure all your routes are defined after CORS middleware 