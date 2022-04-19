const { User } = require("../models/index")

class userController {

  static async userRegister(req, res, next) {
    try {
      let { username, email, password } = req.body
      let data = await User.create({ username, email, password })

      res.status(201).json({
        id: data.id,
        email: data.email
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController;