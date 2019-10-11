const db = require('../../data/dbConfig')

module.exports = {
    find() {
        return db('ingredients')
    },

    findById(id) {
        return db('ingredients')
        .where({id})
    },

    insert(ingredients) {
        return db('ingredients')
        .insert(ingredients)
        .then(_ => this.find())
        .then(ingredients => ingredients.slice(-1)[0])
    },

    update(id, changes) {
        return db('ingredients')
        .update(changes)
        .where('id', id)
        .then(id => this.findById(id)
            .then(([recipe]) => ({
                before: changes,
                after: recipe
            }))
        )
    },

    delete(id) {
        return db('ingredients')
        .delete()
        .where({id})
    }
}
