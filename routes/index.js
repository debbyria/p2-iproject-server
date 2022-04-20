const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter")
const restaurantRouter = require("./restaurantRouter")
const recipesRouter = require("./recipesRouter")

router.use("/users", userRouter)
router.use("/restaurants", restaurantRouter)
router.use("/recipes", recipesRouter)

module.exports = router