
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').delete()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {name: 'onions'},
        {name: 'peppers'},
        {name: 'coconut oil'},
        {name: 'black beans'},
        {name: 'dash of salt'},
        {name: 'bluberries'},
      ]);
    });
};
