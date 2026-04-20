const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const userRoutes = require("./routes/user");

const app = express();
const PORT = 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MongoDB Connected`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
