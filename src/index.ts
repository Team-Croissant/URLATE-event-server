const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);
let adminId = "";
let displayId = "";

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  io.to(socket.id).emit("broadcast", socket.id);

  socket.on("admin", () => {
    adminId = socket.id;
  });

  socket.on("display", () => {
    displayId = socket.id;
  });

  socket.on("handshake", (id, screen) => {
    io.emit("handshake", id, socket.id, screen);
  });

  socket.on("connected", (socketId) => {
    io.to(socketId).emit("connected");
  });

  socket.on("initialize", (socketId) => {
    io.to(socketId).emit("initialize");
  });

  socket.on("initialized", (name) => {
    io.emit("initialized", name, socket.id);
  });

  socket.on("tutorial", (socketId) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial");
  });

  socket.on("tutorial loaded", () => {
    io.emit("tutorial loaded", socket.id);
  });

  socket.on("ready", () => {
    io.emit("ready", socket.id);
  });

  socket.on("tutorial start", (socketId, date) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial start", date);
  });

  socket.on("tutorial restart", (socketId) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial restart");
  });

  socket.on("update", (userId, mouseX, mouseY) => {
    io.emit("update", userId, mouseX, mouseY);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} : User Disconnected.`);
    if (socket.id == adminId) {
      io.emit("admin disconnected");
    } else {
      io.emit("disconnected", socket.id);
    }
  });
});
