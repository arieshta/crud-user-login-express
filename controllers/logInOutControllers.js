const { authLogin, generateToken } = require('../auth/auth');
const session = require('express-session');
const { loginValidation } = require('../auth/validations');

const loginController = (req, res) => {
    var err = loginValidation(req.body);
    if (err) return res.status(400).json({ message: err });

    authLogin(req.body.username, req.body.password, (err, user) => {
        if (user) {
            req.session.regenerate(() => {
                req.session.user = user;
                req.session.success = `Authenticated as ${req.body.username}`;
                const token = generateToken(user._id);
                res.header('token', token);
                res.json({ message: `success login as ${req.body.username}` });
            });
        } else {
            req.session.error = `authentication failed: ${err}`;
            res.json({ message: `login failed: ${err}` });
        }
    });
};

const logoutController = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'logged out' });
    });
};

module.exports = { loginController, logoutController };
