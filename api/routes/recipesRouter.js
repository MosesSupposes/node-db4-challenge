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

router.get('/:id/instructions', (req, res) => {
    RecipesModel
    .getInstructions(req.params.id)
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(404).json({error: "Couldn't find instructions for the recipe with the specified Id."})
    })
})

router.get('/:id/shopping_list', (req, res) => {
    RecipesModel
    .getShoppingList(req.params.id)
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({error: "Couldn't find the recipe with the specified Id."})
    })
})

router.post('/', async (req, res) => {
    const [err, newRecipe] = await withCatch( RecipesModel.insert(req.body) )

    if (err) res.status(500).json({error: "Trouble adding your new recipe to the database."})
    else res.status(201).json(newRecipe)
})

router.put('/:id', async (req, res) => {
    const [err, editedRecipe] = await withCatch( RecipesModel.update(req.params.id, req.body) )

    if (err) res.status(500).json({error: "Trouble updating the recipe with the specified Id."})
    else res.status(200).json(editedRecipe)
})

router.delete('/:id', async (req, res) => {
    const [err, count] = await withCatch( RecipesModel.delete(req.params.id) )

    if (err) res.status(500).json({error: "Trouble deleting the recipe with the specified Id."})
    else res.status(200).json({
        success: "Deleted the recipe with the specified Id.",
        deleted: count
    })
})

module.exports = router