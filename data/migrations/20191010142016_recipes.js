
exports.up = function(knex) {
    return knex.schema.createTable('recipes', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.string('name').notNullable()
        tbl.string('instructions').notNullable()
    })
    .createTable('ingredients', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.string('name').notNullable()
    })
    .createTable('shopping_list', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
        tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('ingredients_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('ingredients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('quantity').unsigned().notNullable()
        tbl.string('unit')
    })
};

exports.down = function(knex) {
   knex.schema.dropTableIfExists('recipes')
   knex.schema.dropTableIfExists('ingredients')
   knex.schema.dropTableIfExists('shopping_list')
};
