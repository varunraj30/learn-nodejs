/* For Stateful
const sessionIdToUserMap = new Map();

function setUser(user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
*/

// For Stateless
const jwt = require("jsonwebtoken");
const secret = "shh";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
