const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  req.user = null;
  const token =
    req.cookies?.uuid || req.headers["authorization"].replace("Bearer ", "");
  if (!token) return next();

  const user = getUser(token);
  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (roles.includes(req.user?.role)) return res.end("Unauthorized");
    next();
  };
}

/*
async function restrictToLoggedInUsersOnly(req, res, next) {
  const userUuid =
    req.cookies?.uuid || req.headers["authorization"].replace("Bearer ", "");
  if (!userUuid) return res.redirect("/login");
  const user = getUser(userUuid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUuid =
    req.cookies?.uuid || req.headers["authorization"].replace("Bearer ", "");

  const user = getUser(userUuid);

  req.user = user;
  next();
}
*/

module.exports = { checkForAuthentication, restrictTo };
