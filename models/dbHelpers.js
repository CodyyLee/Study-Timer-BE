const db = require('../dbConfig');


//**************************
//*****USER DB HELPERS******
//**************************

//Add/Register a new user
async function addUser(user) {
    return await db('users')
        .insert(user, ['id']);
};

//Find all users
function findUsers() {
    return db('users')
}

//Find a user by their ID
function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}

//Find user by username
function findUserByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}

//Update user info
function updateUser(id, info) {
    return (
        db('users')
            .where({ id })
            .update(info, [ id ])
        .then(() => {
            return findUserById(id)
        })
    )
}

//Delete a user
function removeUser(id) {
    return db('users')
        .where({ id })
        .del()
}


//**************************
//****SUBJECT DB HELPERS****
//**************************

//Add a subject
async function addSubject(subject) {
    return db('subject')
        .insert(subject, ['id'])
}

//Get subject by id
function findSubjectById(id) {
    return db('subjects')
        .where({ id })
        .first();
}

//Get all subjects by user_id
function findSubjectsByUser(user_id) {
    return db('subjects')
        .where({ user_id })
}

//Update subject
function updateSubject(id, info) {
    return (
        db('subjects')
            .where({ id })
            .update(info, [id])
            .then(() => {
                return findSubjectById(id);
            })
    )
}

//Delete subject
function removeSubject(id) {
    return db('subjects')
        .where({ id })
        .del()
}


//**************************
//****TIMER DB HELPERS******
//**************************

//Add timer
async function addTimer(timer) {
    return db('timers')
        .insert(timer, ['id'])
}

//Get timer by ID
function findTimerById(id) {
    return db('timers')
        .where({ id })
        .first();
}

//Get timers by user ID
function findTimersByUserId(user_id) {
    return db('timers')
        .where({ user_id })
}

//Get timers by subject id
function findTimersBySubjectId(subject_id) {
    return db('timers')
        .where({ subject_id })
}

//Update timer
function updateTimer(id, info) {
    return(
        db('timers')
            .where({ id })
            .update(info, [ id ])
            .then(() => {
                return findTimerById(id);
            })
    )
}

//Delete timer
function removeTimer(id) {
    return db('timers')
        .where({ id })
        .del();
}

module.exports = {
    addUser,
    findUsers,
    findUserById,
    findUserByUsername,
    updateUser,
    removeUser,
    addSubject,
    findSubjectById,
    findSubjectsByUser,
    updateSubject,
    removeSubject,
    addTimer,
    findTimerById,
    findTimersByUserId,
    findTimersBySubjectId,
    updateTimer,
    removeTimer
}