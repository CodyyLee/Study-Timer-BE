const dbEngine = process.env.DB_ENVIORNMENT || 'development';
const config = require('./knexfile')[dbEngine];

module.exports = require('knex')(config);