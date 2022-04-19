const { User } = require("../models/index")

class userController {
  static async userRegister(req, res, next) {
    try {
      let { username, email, password } = req.body
      let data = await User.create({ username, email, password })
      console.log(data)
    } catch (error) {

    }
  }
}

module.exports = userController;