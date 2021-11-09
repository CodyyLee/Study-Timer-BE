
exports.up = function(knex) {
  return knex.schema.createTable('timers', tbl => {
      tbl.increments()
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('subject_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.text('timer_name', 128)
        .notNullable()
      tbl.integer('duration')
        .notNullable()
        .unsigned()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('timers')
};
