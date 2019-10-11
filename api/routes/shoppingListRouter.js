const express = require('express')
const ShoppingListModel = require('../models/ShoppingListModel')
const { withCatch } = require('../../util')

const router = express.Router()

router.get('/', (req, res) => {
    ShoppingListModel
    .find()
    .then(shoppingList => {
        (!Object.keys(shoppingList).length)
            ? res.status(404).json({error: "There are no shopping lists in the database yet."})
            : res.status(200).json(shoppingList)
    })
    .catch(err => {
        res.status(404).json({error: "There are no shopping lists in the database yet."})
    })
})

router.get('/:ingredients_id', (req, res) => {
    ShoppingListModel
    .findRecipesForIngredient(req.params.ingredients_id)
    .then(shoppingList => {
        (!shoppingList.length)
            ? res.status(404).json({error: "There are no shopping lists in the database yet."})
            : res.status(200).json(shoppingList)
    })
    .catch(err => {
        res.status(404).json({error: "There are no shopping lists in the database yet."})
    })
})

router.post('/', async (req, res) => {
    const [err, newShoppingList] = await withCatch( ShoppingListModel.insert(req.body) )

    if (err) res.status(500).json({error: "Trouble adding your new shopping list to the database."})
    else res.status(201).json(newShoppingList)
})

router.put('/:id', async (req, res) => {
    const [err, editedShoppingList] = await withCatch( ShoppingListModel.update(req.params.id, req.body) )

    if (err) res.status(500).json({error: "Trouble updating the shopping list with the specified Id."})
    else res.status(200).json(editedShoppingList)
})

router.delete('/:id', async (req, res) => {
    const [err, count] = await withCatch( ShoppingListModel.delete(req.params.id) )

    if (err) res.json(500).json({error: "Trouble deleting the shopping list with the specified Id."})
    else res.status(200).json({
        success: "Deleted the shopping list with the spcified Id.",
        itemsDeleted: count
    })
})

module.exports = router