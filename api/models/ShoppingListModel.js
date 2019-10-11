const db = require('../../data/dbConfig')

module.exports = {
    find() {
        return db
        .select('sl.id', 'r.name as recipeName', 'i.name as ingredientName', 'sl.quantity', 'sl.unit','sl.recipe_id', 'sl.ingredients_id', 'sl.created_at', 'sl.updated_at')
        .from('shopping_list as sl')
        .join('recipes as r', 'r.id', 'sl.recipe_id')
        .join('ingredients as i', 'i.id', 'sl.ingredients_id')
    },

    findById(id) {
        return db('shopping_list')
        .where({id})
    },

    findRecipesForIngredient(ingredientId) {
        return db
        .select('sl.id', 'r.name as recipeName', 'i.name as ingredientName', 'sl.quantity', 'sl.unit','sl.recipe_id', 'sl.ingredients_id', 'sl.created_at', 'sl.updated_at')
        .from('shopping_list as sl')
        .where('ingredients_id', ingredientId)
        .join('recipes as r', 'r.id', 'sl.recipe_id')
        .join('ingredients as i', 'i.id', `sl.ingredients_id`)
    },

    insert(recipe) {
        return db('shopping_list')
        .insert(recipe)
        .then(_ => this.find())
        .then(shopping_list => shopping_list.slice(-1)[0])
    },

    update(id, changes) {
        return db('shopping_list')
        .update(changes)
        .where('id', id)
        .then(_ => this.findById(id)
            .then(([shoppingList]) => ({
                before: changes,
                after: shoppingList
            }))
        )
    },

    delete(id) {
        return db('shopping_list')
        .delete()
        .where('id', id)
    }
}
