const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
// We need to attach socket io with express you cannot app.listen directly
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  console.log(`New User connection ${socket.id}`);
  socket.on("usr-message", (message) => {
    console.log(`New user message ${message}`);
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(8000, () => console.log(`Server is running at port 8000`));
