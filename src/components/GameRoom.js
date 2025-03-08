"use client"; // Required for client-side components

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const GameRoom = ({ gameId }) => {
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    console.log("Connecting to Pusher...");

    pusher.connection.bind("connected", () => {
      console.log("Pusher connected successfully!");
    });

    const gameChannel = `game-${gameId}`;
    console.log("Subscribing to channel:", gameChannel);
    const channel = pusher.subscribe(gameChannel);

    channel.bind("updateGameState", (data) => {
      console.log("Received game update:", data);
      setGameState((prevState) => ({
        ...prevState,
        ...data,
      }));
    });

    return () => {
      console.log("Unsubscribing from channel:", gameChannel);
      pusher.unsubscribe(gameChannel);
    };
  }, [gameId]);

  const handlePlayerAction = async (action) => {
    const gameChannel = `game-${gameId}`;

    await fetch("/api/pusher", {
      method: "POST",
      body: JSON.stringify({
        channel: gameChannel,
        event: "updateGameState",
        data: action,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <h2>Game Room: {gameId}</h2>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
      <button onClick={() => handlePlayerAction({ action: "playCard" })}>
        Play Card
      </button>
    </div>
  );
};

export default GameRoom;
