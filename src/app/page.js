"use client";

import { useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  useEffect(() => {
    const socket = io(); // Connect to the WebSocket server
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Card Game</h1>
      <div>Game Room</div>
    </div>
  );
}
