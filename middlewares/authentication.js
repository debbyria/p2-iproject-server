const { readPayloadFromToken } = require("../helpers/helper");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readPayloadFromToken(access_token);

    let userFound = await User.findByPk(payload.id);
    if (!userFound) {
      throw { name: "Authentication failed", statusCode: 401 };
    } else {
      req.user = {
        id: userFound.id,
        username: userFound.username,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication