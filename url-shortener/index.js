const express = require("express");

const app = express();
const PORT = 8000;

const URLRoute = require("./routes/url");
const { connectToDb } = require("./db");
const URL = require("./models/url");

connectToDb(process.env.MONGO_URL).then(() => console.log(`DB Connected`));

app.use(express.json());
app.use("/url", URLRoute);

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
