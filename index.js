require('dotenv').config()
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const server = http.createServer(app);
const port = process.env.PORT || 8000
const io = new Server(server, {
  cors: {
    origin: "https://wly0601.github.io/websocket-learn/", // TODO: Ganti jadi URL react-mu
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("INFO:", "seseorang telah bergabung ke chat room!");

  socket.on("chat message", (msg) => {
    console.log("INFO:", "incoming message", JSON.stringify(msg));
    io.emit("incoming message", msg);
  });

  socket.on("disconnect", () => {
    console.log("INFO:", "seseorang telah pergi dari chat room!");
  });
});

server.listen(port, () => {
  console.log("INFO:", "Server on");
});
