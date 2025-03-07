import { Server } from "socket.io";

export async function GET(req) {
  const io = new Server();
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  return new Response("Socket server started");
}
