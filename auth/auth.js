const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authLogin = async (name, pass, fn) => {
    var user = await Users.findOne({ username: name });
    if (!user) return fn(new Error('user not found'));

    bcrypt.compare(pass, user.hashpass, (err, res) => {
        if (err) return fn(err);
        if (res == true) return fn(null, user);
        fn(new Error('invalid password'));
    });
};

const generateToken = (_id, role) => {
    const token = jwt.sign({ _id: _id, role: role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
};

const auth = (req, res, next) => {
    const token = req.token;
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = { authLogin, generateToken, auth };
