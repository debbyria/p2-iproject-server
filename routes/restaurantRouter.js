const express = require('express')
const router = express.Router()
const restaurantController = require("../controllers/restaurantController")

router.get('/', restaurantController.getAllRestaurants)
router.get('/list', restaurantController.allRestaurants)

module.exports = router