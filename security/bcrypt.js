const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const compare = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

module.exports = {
    encrypt,
    compare
};