const { getUser } = require("../service/auth");

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

module.exports = { restrictToLoggedInUsersOnly, checkAuth };
