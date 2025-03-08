"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GameRoom from "@/components/GameRoom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <GameRoom gameId="room123" />
    </div>
  );
}
