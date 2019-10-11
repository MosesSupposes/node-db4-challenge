const db = require('../../data/dbConfig')

module.exports = {
    find() {
        return db('recipes')
    },

    findById(id) {
        return db('recipes')
        .where('id', id)
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
        .then(id => ({
            before: changes,
            after: this.findById(id)
        }))
    },

    delete(id) {
        return db('recipes')
        .delete()
        .where('id', id)
    }
}
