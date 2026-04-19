const shortid = require("shortid");
const URL = require("../models/url");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.render("/");
}
/* For Stateful
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid username or password" });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uuid", sessionId);

  return res.redirect("/");
}
*/

// For Stateless
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid username or password" });

  const token = setUser(user);
  res.cookie(
    "uuid",
    token,
    // { domain: "domain" }
    // expires - Date
    // httpOnly - Boolean
    // https://expressjs.com/en/api.html
  );

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
