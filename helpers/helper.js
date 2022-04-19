const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function createHashFromPass(password) {
  return bcrypt.hashSync(password, 10);
}

function checkPassWithHash(password, hashDatabase) {
  return bcrypt.compareSync(password, hashDatabase);
}

function tokenFromPayload(payload) {
  return jwt.sign(payload, secretKey);
}

function readPayloadFromToken(token) {
  return jwt.verify(token, secretKey);
}

function generatePassword(username, email) {
  return `${username.slice(0, 3)}_${email.slice(0, 10)}`
}

module.exports = {
  createHashFromPass,
  checkPassWithHash,
  tokenFromPayload,
  readPayloadFromToken,
  generatePassword
};
