const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const getToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const forgetToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
    return token;
};

const verifyToken = (token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

module.exports = {
    getToken,
    forgetToken,
    verifyToken
};