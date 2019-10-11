const express = require('express')
const IngredientsModel = require('../models/IngredientsModel')
const { withCatch } = require('../../util')

const router = express.Router()

router.get('/', async (req, res) => {
    const [err, ingredients] = await withCatch( IngredientsModel.find() )

    if (err) res.status(404).json({error: "There are no ingredients stored in the database yet."})
    else if (!Object.keys(ingredients).length) res.status(404).json({error: "There are no ingredients stored in the database yet."})
    else res.status(200).json(ingredients)
})

router.get('/:id', async(req, res) => {
    const [err, ingredient] = await withCatch( IngredientsModel.findById(req.params.id) )

    if (err) res.status(404).json({error: "There is no ingredient with the specified Id." })
    else if (!Object.keys(ingredient).length) res.status(404).json({error: "There is no ingredient with the specified Id." })
    else res.status(200).json(ingredient) 
})

router.post('/', async (req, res) => {
    const [err, newIngredient] = await withCatch( IngredientsModel.insert(req.body) )

    if (err) res.status(500).json({error: "Trouble adding your ingredient to the database."})
    else res.status(201).json(newIngredient)
})

router.put('/:id', async (req, res) => {
    const [err, editedIngredient] = await withCatch( IngredientsModel.update(req.params.id, req.body) )

    if (err) res.status(500).json({error: "Trouble updating the ingredient with the specified Id."})
    else res.status(200).json(editedIngredient)
})

router.delete('/:id', async (req, res) => {
    const [err, count] = await withCatch( IngredientsModel.delete(req.params.id) )

    if (err) res.status(500).json({error: "Trouble deleting the ingredient with the specified Id."})
    else res.status(200).json({
        success: "Deleted the recipe with the specified Id.",
        deleted: count
    })
})

module.exports = router