// const cors = require('cors');

// // Define allowed origins
// const allowedOrigins = [
//     'https://study-sphere-tau.vercel.app/',
//     'http://localhost:5173',
//     'http://localhost:3000',
//     // Allow all Vercel preview deployments
//     /^https:\/\/study-sphere-git-.*\.vercel\.app$/
// ];

// // Update CORS middleware
// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);

//         // Log the incoming origin for debugging
//         console.log(`Incoming origin: ${origin}`);

//         // Check if the origin is allowed
//         const isAllowed = allowedOrigins.some(allowedOrigin => {
//             if (allowedOrigin instanceof RegExp) {
//                 return allowedOrigin.test(origin);
//             }
//             return allowedOrigin === origin;
//         });

//         if (isAllowed) {
//             callback(null, true);
//         } else {
//             console.warn(`CORS blocked for origin: ${origin}`);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Make sure all your routes are defined after CORS middleware 