const express = require("express");
const path = require("path");
const URLRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const { connectToDb } = require("./db");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middleware/auth");

const app = express();

const PORT = 8000;

connectToDb(process.env.MONGO_URL)
  .then(() => console.log(`DB Connected`))
  .catch((err) => console.log(`ERROR ${err}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", restrictToLoggedInUsersOnly, staticRouter);
app.use("/url", URLRoute);
app.use("/user", checkAuth, userRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
