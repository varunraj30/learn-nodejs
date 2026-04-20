const jwt = require("jsonwebtoken");

const secret = "shh";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1hr" });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
