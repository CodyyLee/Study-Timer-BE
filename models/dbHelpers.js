const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);


//**************************
//*****USER DB HELPERS******
//**************************

//Add/Register a new user
async function addUser(user) {
    const [ id ] = await db("users").insert(user);

    return user;
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
async function addSubject(subject, user_id) {
    const [ id ] = await db('subjects')
        .where({ user_id })
        .insert(subject);

    return subject;
}

//Get subject by id
function findSubjectById(id) {
    return db('subjects')
        .where({ id })
        .first();
}

//Get all subjects by user_id

//Update subject

//Delete subject

module.exports = {
    addUser,
    findUsers,
    findUserById,
    updateUser,
    removeUser,
    addSubject,
    findSubjectById
}