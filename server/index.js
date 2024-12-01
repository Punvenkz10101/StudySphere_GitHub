app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Remove trailing slash if present
    const cleanOrigin = origin?.replace(/\/$/, '');
    
    if (cleanOrigin === 'https://study-sphere-git-hub.vercel.app') {
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