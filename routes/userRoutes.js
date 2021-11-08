const express = require('express');
const db = require('../models/dbHelpers');
const router = express.Router();

//create user endpoint
router.post('/', (req, res) => {

    if(!req.body.username || !req.body.password) {
        res.status(401).json({ message: 'Must include both a username and password.' });
    }
    else {
        return db.addUser(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({message: `Server error occured: ${err}`});
        })
    }
});

//get all users endpoint
router.get('/', (req, res) => {
    return db.findUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({message: `Server error occured: ${err}`})
        })
})

//find user by id endpoint
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    return db.findUserById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({message: 'User was not found.'})
            }
        })
        .catch(err => {
            res.status(500).json({message: `Server error occured: ${err}`})
        })
});

//Update user info
router.patch('/:id', (req, res) => {
    const userInfo = req.body;
    const { id } = req.params;

    return db.updateUser(id, userInfo)
        .then(user => {
            if(user) {
                res.status(201).json(user)
            }
            else {
                res.status(404).json({ message: 'User with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Remove a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    return db.removeUser(id)
        .then(count => {
            if(count) {
                res.status(200).json({message: 'User has been deleted.'})
            } else {
                res.status(404).json({ message: 'User with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

module.exports = router;