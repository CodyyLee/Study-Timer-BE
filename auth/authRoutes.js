const express = require('express');
const db = require('../models/dbHelpers');
const bcrypt = require('bcryptjs');
const router = express.Router();
const generateToken = require('./generateToken');

//Login endpoint
router.post('/', (req, res) => {
    const credentials = req.body;
    const { username, password } = credentials;

    if(!username || !password) {
        res.status(401).json({ message: "Username and Password required." })
    }

    return db.findUserByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {

                const token = generateToken(user);

                res.status(201).json({ message: `Welcome, ${username}!`, token})
            } else {
                res.status(401).json({ message: 'Incorrect username/password. Please try again.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

module.exports = router;