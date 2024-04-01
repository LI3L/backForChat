const express = require("express");
const http = require("http");
const socket = require("socket.io");
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("connect", (data) => {
    console.log("Connencted: ", data);
    io.emit("Connected: ", data);
  });
  socket.on("message", (msg) => {
    console.log("message: ", msg);
    io.emit("message", msg);
  });

  socket.on("Disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
