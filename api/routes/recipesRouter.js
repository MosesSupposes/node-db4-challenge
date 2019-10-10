const express = require('express')
const RecipesModel = require('../models/RecipesModel')

const router = express.Router()

router.get('/', (req, res) => {
    RecipesModel
    .find()
    .then(recipes => {
        (!recipes.length)
            ? res.status(404).json({error: "There are no recipes in the database yet"})
            : res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(404).json({error: "There are no recipes in the database yet"})
    })
})

router.get('/:id', (req, res) => {
    RecipesModel
    .findById(req.params.id)
    .then(recipes => {
        (!recipes.length)
            ? res.status(404).json({error: "There are no recipes in the database yet"})
            : res.json(200).json(recipes)
    })
    .catch(err => {
        res.status(404).json({error: "There are no recipes in the database yet"})
    })
})

module.exports = router