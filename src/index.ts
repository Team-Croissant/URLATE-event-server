const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  // redisClient.set(`socket${socket.id}`, socket.handshake.query.id);
  // redisClient.set(`user${socket.id}`, socket.handshake.query.name);

  socket.on("disconnect", () => {
    console.log(`${socket.id} : User Disconnected.`);
  });
});
