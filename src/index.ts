const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);
let adminId = "";

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  io.to(socket.id).emit("broadcast", socket.id);

  socket.on("admin", () => {
    adminId = socket.id;
  });

  socket.on("handshake", (id, socketId) => {
    io.emit("handshake", id, socketId);
  });

  socket.on("connected", (socketId) => {
    io.to(socketId).emit("connected");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} : User Disconnected.`);
    if (socket.id == adminId) {
      io.emit("admin disconnected");
    } else {
      io.emit("disconnected", socket.id);
    }
  });

  socket.on("initialize", (socketId) => {
    io.to(socketId).emit("initialize");
  });
});
