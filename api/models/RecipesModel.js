const db = require('../../data/dbConfig')

module.exports = {
    find() {
        return db('recipes')
    },

    findById(id) {
        return db('recipes')
        .where('id', id)
    },

    update(id, changes) {
        return db('recipes')
        .update(changes)
        .where('id', id)
    },

    delete(id) {
        return db('recipes')
        .delete()
        .where('id', id)
    }
}