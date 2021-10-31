const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'login at /login' });
});

const loginRoute = require('./loginRoute');
router.use('/login', loginRoute);

const logoutRoute = require('./logoutRoute');
router.use('/logout', logoutRoute);

const usersRoute = require('./usersRoute');
router.use('/users', auth, usersRoute);

module.exports = router;
