const express = require('express');

//route imports
const userRouter = require('../routes/userRoutes');
const subjectRouter = require('../routes/subjectRoutes');
const timerRouter = require('../routes/timerRoutes');

const server = express();

server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/timers', timerRouter);
server.use('/api/subjects', subjectRouter);

module.exports = server;