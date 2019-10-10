const express = require('express')
const recipesRouter = require('./routes/recipesRouter')
const ingredientsRouter = require('./routes/ingredientsRouter')

const server = express()

server.use(express.json())
server.use('/api/recipes', recipesRouter)
server.use('/api/ingredients', ingredientsRouter)

module.exports = server