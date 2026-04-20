const { validateToken } = require("../services/auth");

function checkForAuthentication(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (error) {
      console.log(`Error validating user ${error}`);
    }
    return next();
  };
}

module.exports = checkForAuthentication;
