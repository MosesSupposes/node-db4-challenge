const express = require('express')
const recipesRouter = require('./routes/recipesRouter')
const ingredientsRouter = require('./routes/ingredientsRouter')
const shoppingListRouter = require('./routes/shoppingListRouter')

const server = express()

server.use(express.json())
server.use('/api/recipes', recipesRouter)
server.use('/api/ingredients', ingredientsRouter)
server.use('/api/shopping_list', shoppingListRouter)

module.exports = server