exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.text('username', 128)
        .notNullable()
        .unique()
        .index()
      tbl.text('password', 288)
        .notNullable()
      tbl.timestamps(true, true)
      tbl.text('display_name')

  })
  .createTable('subjects', tbl => {
      tbl.increments()
      tbl.text('subject_name', 128)
        .notNullable()
      tbl.integer('study_total')
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('subjects')
};
