const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  if (socket.handshake.query.id != 0) {
    io.emit("connected", socket.handshake.query.id, socket.id);
  }

  socket.on("disconnect", () => {
    console.log(`${socket.id} : User Disconnected.`);
    io.emit("disconnected", socket.id);
  });
});
