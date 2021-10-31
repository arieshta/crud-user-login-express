const bcrypt = require('bcrypt');
const { registrationValidation } = require('../auth/validations');
const Users = require('../models/usersModel');

const registerController = async (req, res) => {
    // if (req.user.role != 'admin') {
    //     return res.status(401).json({ message: 'Access Denied' });
    // }

    var err = registrationValidation(req.body);
    if (err) return res.status(400).json({ message: err });

    // var user = await Users.findOne({ username: req.body.username });
    // if (user) return res.status(400).json({ message: 'username already used' });

    if (
        req.body.role == 'admin' &&
        req.body.admin_key != process.env.ADMIN_KEY
    ) {
        return res.status(400).json({ message: 'Wrong admin key' });
    }

    const salt = await bcrypt.genSalt(2);
    const hashpass = await bcrypt.hash(req.body.password, salt);

    user = new Users({
        username: req.body.username,
        fullname: req.body.fullname,
        role: req.body.role,
        hashpass: hashpass
    });

    try {
        console.log('--')
        const savedUser = await user.save();
        console.log('9')
        res.json({ message: 'success create user', data: savedUser });
    } catch (err) {
        res.json({ message: err });
    }
};

const getAllUserController = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            const users = await Users.find();
            res.json({ message: 'success get all users', data: users });
        } else {
            const users = await Users.find({ _id: req.user._id });
            res.json({ message: 'success get user', data: users });
        }
    } catch (err) {
        res.json({ message: err });
    }
};

const getUserByIdController = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.json({ message: 'success get user', data: user });
    } catch (err) {
        res.json({ message: err });
    }
};

const updateUserByIdController = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Access Denied' });
        }

        const user = await Users.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    username: req.body.username,
                    fullname: req.body.fullname,
                    password: req.body.password,
                    updated: Date.now
                }
            }
        );

        res.json({ message: 'success update user', data: user });
    } catch (err) {
        res.json({ message: err });
    }
};

const deleteUserByIdController = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Access Denied' });
        }

        const user = await Users.findByIdAndRemove(req.params.id);
        res.json({ message: 'success delete user', data: user });
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    registerController,
    getAllUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController
};
