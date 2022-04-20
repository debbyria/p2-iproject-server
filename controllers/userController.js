const { checkPassWithHash, tokenFromPayload } = require("../helpers/helper")
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

  static async userLogin(req, res, next) {
    try {
      let { email, password } = req.body
      let checkEmail = await User.findOne({
        where: {
          email
        }
      })
      if (!checkEmail) {
        throw { name: "USER_NOT_FOUND" }
      }

      let checkPass = checkPassWithHash(password, checkEmail.password)
      if (!checkPass) {
        throw { name: "USER_NOT_FOUND" }
      }
      let payload = {
        id: checkEmail.id,
        email: checkEmail.email
      }
      let token = tokenFromPayload(payload)
      res.status(200).json({
        access_token: token,
        id: checkEmail.id,
        username: checkEmail.username
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = userController;