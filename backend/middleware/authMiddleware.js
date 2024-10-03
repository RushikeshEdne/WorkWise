const jwt = require('jsonwebtoken');

// Middleware to verify token and role-based access
const authMiddleware = (role) => {
    return (req, res, next) => {

        const authHeader = req.header('Authorization');

        if (!authHeader) {
            console.log('No Authorization header provided');
            return res.status(401).json({ message: 'Authorization header missing' });
        }






        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (role && decoded.role !== role) {
                console.log(`Access denied for role: ${decoded.role}, required role: ${role}`);
                return res.status(403).json({ message: 'Access denied' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            console.error('Token verification error:', err);
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
