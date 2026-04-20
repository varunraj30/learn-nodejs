const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  return res.send(`Hello from the server ${process.pid}`);
});

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
