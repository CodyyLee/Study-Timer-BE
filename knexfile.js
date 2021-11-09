// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/db.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    rejectUnauthorized: false,
    pool: {
      min: 2,
      max: 10
    },
    tablename:'knex_migrations',
    directory: './migrations'
  }
};
