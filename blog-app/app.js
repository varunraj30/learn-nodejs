require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");
const checkForAuthentication = require("./middlewares/auth.js");
const Blog = require("./models/Blog.model.js");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MongoDB Connected`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdAt");
  return res.render("home", { user: req.user, blogs: allBlogs });
});

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
