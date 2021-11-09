const { parse } = require('pg-connection-string');
const dbEngine = parse(process.env.DB_ENVIORNMENT) || 'development';
const config = require('./knexfile')[dbEngine];

config.ssl = {
    rejectUnauthorized: false
}

module.exports = require('knex')(config);