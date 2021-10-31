const { authLogin, generateToken } = require('../auth/auth');
const { loginValidation } = require('../auth/validations');

const loginController = (req, res) => {
    var err = loginValidation(req.body);
    if (err) return res.status(400).json({ message: err });

    authLogin(req.body.username, req.body.password, (err, user) => {
        if (user) {
            const token = generateToken(user._id, user.role);
            res.header('token', token);
            res.json({ message: `success login as ${req.body.username}` });
        } else {
            res.json({ message: `login failed: ${err}` });
        }
    });
};

// const logoutController = (req, res) => {
//     req.session.destroy(() => {
//         res.json({ message: 'logged out' });
//     });
// };

module.exports = { loginController };
