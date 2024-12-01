app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // List of allowed origins
    const allowedOrigins = [
        'https://study-sphere-git-hub.vercel.app',
        'https://study-sphere-git-hub.vercel.app/',
        // Allow Vercel preview deployments
        /^https:\/\/study-sphere-git-.*\.vercel\.app$/
    ];

    // Check if the origin matches any of our allowed origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin instanceof RegExp) {
            return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
    });

    if (isAllowed) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Make sure all your routes are defined after CORS middleware 