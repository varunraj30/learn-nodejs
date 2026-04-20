const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCPU = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.get("/", async (req, res) => {
    return res.send(`Hello from the server ${process.pid}`);
  });

  app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
}
