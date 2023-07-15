const { verifyToken } = require('../security/jwt');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const payload = verifyToken(token);
        req.user = payload;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = authMiddleware;