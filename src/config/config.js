const bcrypt = require('bcrypt');
const Users = require('../models/usersModel');

// Make admin
const initAdmin = async () => {
    const pass = 'adminadmin';
    const salt = await bcrypt.genSalt(2);
    const hashpass = await bcrypt.hash(pass, salt);

    const user = new Users({
        username: 'admin1',
        fullname: 'admin1',
        role: 'admin',
        hashpass: hashpass
    });

    await user.save();
    console.log('Created admin');
};

// Drop collection
const dropCollection = async () => {
    console.log('Drop collection');
    try {
        // await Users.db.dropCollection('users')
        await Users.collection.drop();        
    } catch (err) {
        console.log('drop failed', err)
    }
};

module.exports = { initAdmin, dropCollection };
