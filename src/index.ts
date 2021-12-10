const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);
let adminId = "";

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  io.to(socket.id).emit("broadcast", socket.id);

  socket.on("admin", () => {
    adminId = socket.id;
  });

  socket.on("handshake", (id) => {
    io.emit("handshake", id, socket.id);
  });

  socket.on("connected", (socketId) => {
    io.to(socketId).emit("connected");
  });

  socket.on("initialize", (socketId) => {
    io.to(socketId).emit("initialize");
  });

  socket.on("tutorial", (socketId) => {
    io.to(socketId).emit("tutorial");
  });

  socket.on("initialized", (name) => {
    io.emit("initialized", name, socket.id);
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
