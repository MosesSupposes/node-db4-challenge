
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').delete()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {name: 'Peach Cobbler', instructions: "First do this, then do that"},
        {name: 'Mac and Cheese', instructions: "First, second, third..."},
        {name: 'Gingerbread Cookies', instructions: "Open case, put on tray, throw in oven for 30 min, eat."}
      ]);
    });
};
