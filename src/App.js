import express from "express";
//CORS
import cors from "cors";
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(cors());
let users = [];
io.listen(4000);
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });
  socket.on(
    "sendMessage",
    ({ conservationId, senderId, message, receiverId }) => {
      const receiver = users.find((user) => user.userId === receiverId);
      const sender = users.find((user) => user.userId === senderId);
      if (receiver) {
        io.to(receiver.socketId).to(sender.socketId).emit("getMessage", {
          senderId,
          message,
          conservationId,
          receiverId,
        });
      }
    }
  );
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import authRoutes from "./routers/auth.routes.js";
import conversationRoutes from "./routers/conversation.routes.js";
import messageRoutes from "./routers/message.routes.js";
//sample router
app.get("/", (_, res) => {
  res.send("<h1>Welcome to Chat application</h1>");
});
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/message", messageRoutes);

export { app };
