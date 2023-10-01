const express = require('express')
const router = express.Router()
const recipeController = require("../controllers/recipeController")
const authentication = require("../middlewares/authentication")

router.get('/', recipeController.getParamsRecipe)
router.post('/favorite', authentication, recipeController.postFavorite)
router.get('/favorite', authentication, recipeController.getFavoriteRecipes)

module.exports = router