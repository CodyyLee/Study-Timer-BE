const { parse } = require('pg-connection-string');
const dbEngine = process.env.DB_ENVIORNMENT || 'development';
const config = require('./knexfile')[parse(dbEngine)];

config.ssl = {
    rejectUnauthorized: false
}

module.exports = require('knex')(config);