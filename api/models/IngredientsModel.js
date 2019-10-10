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
        .then(_ => ingredients)
    },

    update(id, changes) {
        return db('ingredients')
        .update(changes)
        .where({id})
        .then(id => ({
            before: changes,
            after: this.findById(id)
        }))
    },

    delete(id) {
        return db('ingredients')
        .delete()
        .where({id})
    }
}
