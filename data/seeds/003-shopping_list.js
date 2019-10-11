
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shopping_list').delete()
    .then(function () {
      // Inserts seed entries
      return knex('shopping_list').insert([
        {recipe_id: 1, ingredients_id: 2, quantity: 2, unit: ""},
        {recipe_id: 1, ingredients_id: 1, quantity: 5, unit: ""},
        {recipe_id: 1, ingredients_id: 3, quantity: 4, unit: ""},
        {recipe_id: 2, ingredients_id: 4, quantity: 1, unit: ""},
        {recipe_id: 3, ingredients_id: 4, quantity: 2, unit: ""}
      ]);
    });
};
