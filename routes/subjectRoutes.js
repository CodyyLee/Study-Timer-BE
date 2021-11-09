const express = require('express');
const db = require('../models/dbHelpers');
const router = express.Router();

//Add a new subject
router.post('/:user_id', (req, res) => {
    const subjectInfo = req.body;

    if(!subjectInfo.subject_name) {
        res.status(401).json({ message: 'Subject must include a subject name.' });
    } else {

        if(!subjectInfo.user_id) {
            subjectInfo.user_id = req.params.user_id;
        }

        return db.addSubject(req.body)
        .then(subject => {
            res.status(201).json(subject);
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
    }
})

//Find subject by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    return db.findSubjectById(id)
        .then(subject => {
            if(subject) {
                res.status(200).json(subject);
            } else {
                res.status(404).json({ message: 'Subject with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Find all user's subjects
router.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    return db.findSubjectsByUser(user_id)
        .then(subjects => {
            if(subjects.length > 0) {
                res.status(200).json(subjects)
            } else {
                res.status(404).json({ message: 'No subjects were found with this user ID.'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Update subject
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    
    return db.updateSubject(id, req.body)
        .then(subject => {
            if(subject) {
                res.status(201).json(subject);
            } else {
                res.status(404).json({ message: 'Subject with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

//Delete a subject
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    return db.removeSubject(id)
        .then(count => {
            if(count > 0) {
                res.status(201).json({ message: 'Subject was deleted successfully.' })
            } else {
                res.status(404).json({ message: 'Subject with this ID was not found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error occured: ${err}`})
        })
})

module.exports = router;