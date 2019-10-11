const db = require('../../data/dbConfig')
const { filterObj } = require('../../util')

module.exports = {
    find() {
        return db('recipes')
    },

    findById(id) {
        return db('recipes')
        .where('id', id)
    },

    getInstructions(id) {
        return db('recipes')
        .where({id})
        .then(recipe => filterObj(value => value.toLowerCase() === "instructions", recipe[0]) )
    },

    getShoppingList(id) {
        return db
        .select('r.id', 'sl.id as shoppingListId', 'r.name as recipeName', 'i.name as ingredientName', 'sl.quantity', 'sl.unit', 'sl.ingredients_id', 'sl.created_at', 'sl.updated_at')
        .from('shopping_list as sl')
        .where({recipe_id: id})
        .join('recipes as r', 'r.id', 'sl.recipe_id')
        .join('ingredients as i', 'i.id', 'sl.ingredients_id')
    },

    insert(recipe) {
        return db('recipes')
        .insert(recipe)
        .then(_ => this.find())
        .then(recipes => recipes.slice(-1)[0])
    },

    update(id, changes) {
        return db('recipes')
        .update(changes)
        .where('id', id)
        .then(_ => this.findById(id)
            .then(([recipe]) => ({
                before: changes,
                after: recipe
            }))
        )
    },

    delete(id) {
        return db('recipes')
        .delete()
        .where('id', id)
    }
}
