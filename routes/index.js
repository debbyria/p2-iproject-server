const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter")
const restaurantRouter = require("./restaurantRouter")

router.use("/users", userRouter)
router.use("/restaurants", restaurantRouter)

module.exports = router