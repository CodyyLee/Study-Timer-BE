const express = require('express');
const db = require('../models/dbHelpers');
const router = express.Router();

//Add new timer
router.post('/:user_id', (req, res) => {
    const { user_id } = req.params;

    if(!req.body.timer_name || !req.body.duration || !req.body.subject_id) {
        res.status(401).json({ message: 'Please include all required fields.' })
    } else {
        if(!req.body.user_id) {
            req.body.user_id = user_id;
        }

        return db.addTimer(req.body)
            .then(timer => {
                res.status(201).json(timer);
            })
            .catch(err => {
                res.status(500).json({ message: `Server error occured: ${err}`})
            })
    }
})

//Find timer by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    return db.findTimerById(id)
        .then(timer => {
            if(timer) {
                res.status(200).json(timer);
            } else {
                res.status(404).json({ message: 'Timer with this ID could not be found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Find timers by user ID
router.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;

    return db.findTimersByUserId(user_id)
        .then(timers => {
            if(timers.length > 1) {
                res.status(200).json(timers);
            } else {
                res.status(404).json({ message: 'Timers with this user ID could not be found.'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Find timers by subject ID
router.get('/subject/:subject_id', (req, res) => {
    const { subject_id } = req.params;

    return db.findTimersBySubjectId(subject_id)
        .then(timers => {
            if(timers.length > 1) {
                res.status(200).json(timers);
            } else {
                res.status(404).json({ message: 'Timers with this subject ID were not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Update timer info
router.patch('/:id', (req, res) => {
    const { id } = req.params;

    return db.updateTimer(id, req.body)
        .then(timer => {
            if(timer) {
                res.status(201).json(timer);
            } else {
                res.status(404).json({ message: 'Timer with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Delete Timer
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    return db.removeTimer(id)
        .then(count => {
            if(count > 0) {
                res.status(201).json({ message: 'Timer successfully deleted.' })
            } else {
                res.status(404).json({ message: 'Timer with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

module.exports = router;