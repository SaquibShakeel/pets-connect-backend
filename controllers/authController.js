const User = require('../models/userSchema');
const { encrypt, compare } = require('../security/bcrypt');
const { getToken } = require('../security/jwt');

const signUp = async (req, res) => {
    try {
        const { name, email, password, contact } = req.body;
        User.findOne({ email: email }, async (err, user) => {
            if (user) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const hash = await encrypt(password);
            const newUser = new User({
                name: name,
                email: email,
                password: hash,
                contact: contact
            });
            const nayaUser = await User.create(newUser);
            const token = getToken({ id: nayaUser._id });
            res.status(201).json({
              message: "User created successfully",
              token: token,
              user: {
                name: nayaUser.name,
                email: nayaUser.email,
                contact: nayaUser.contact,
                createdAt: nayaUser.createdAt,
              },
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        User.findOne({ email: email }, async (err, user) => {
            if (!user) {
                return res.status(400).json({ message: 'Incorrect email' });
            }
            const result = await compare(password, user.password);
            if (result) {
                const token = getToken({ id: user._id });
                res.status(200).json({
                  token: token,
                  user: {
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                  },
                });
            } else {
                res.status(400).json({ message: 'Incorrect password' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    signUp,
    signIn
};