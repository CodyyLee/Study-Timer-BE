const express = require('express');
const restricted = require('../auth/restrictedMiddleware');

//route imports
const userRouter = require('../routes/userRoutes');
const subjectRouter = require('../routes/subjectRoutes');
const timerRouter = require('../routes/timerRoutes');
const authRouter = require('../auth/authRoutes');

const server = express();

server.use(express.json());

server.use('/api/login', authRouter);
server.use('/api/users', restricted, userRouter);
server.use('/api/timers', restricted, timerRouter);
server.use('/api/subjects', restricted, subjectRouter);

module.exports = server;