const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome");
});

app.get("/about", (req, res) => {
  return res.send("About page");
});

app.listen(8000, () => {
  console.log(`Server started!!`);
});
