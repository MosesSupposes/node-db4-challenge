const express = require('express')
const RecipesModel = require('../models/RecipesModel')
const { withCatch } = require('../../util')

const router = express.Router()

router.get('/', (req, res) => {
    RecipesModel
    .find()
    .then(recipes => {
        (!Object.keys(recipes).length)
            ? res.status(404).json({error: "There are no recipes in the database yet."})
            : res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(404).json({error: "There are no recipes in the database yet."})
    })
})

router.get('/:id', (req, res) => {
    RecipesModel
    .findById(req.params.id)
    .then(recipes => {
        (!recipes.length)
            ? res.status(404).json({error: "There are no recipes in the database yet."})
            : res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(404).json({error: "There are no recipes in the database yet."})
    })
})

router.post('/', async (req, res) => {
    const [err, newRecipe] = await withCatch( RecipesModel.insert(req.body) )

    if (err) res.status(500).json({error: "Trouble adding your new recipe to the database."})
    else res.status(201).json(newRecipe)
})

module.exports = router