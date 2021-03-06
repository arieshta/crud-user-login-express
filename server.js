const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bearer = require('express-bearer-token');
const router = require('./src/routes/routes');
const { dropCollection, initAdmin } = require('./src/config/config');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bearer());

// Logger
const logger = (req, res, next) => {
    var date = new Date();
    var dateTime =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds();
    console.log(`[${dateTime}] ${req.method} ${req.url} ${res.statusCode}`);
    next();
};
app.use(logger);

// Routes
app.use('/api', router);

// Server init function
const port = 3000;
const initServer = () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

// Connect db and start server
// dbConnection = process.env.DB_CONNECTION
dbConnection = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
mongoose.connect(dbConnection, async () => {
    console.log('connected to DB');
    await dropCollection()
    await initAdmin()
    initServer();
})
