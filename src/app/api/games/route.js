import Pusher from "pusher";
import { NextResponse } from "next/server";
import { startGame, playCard, endTurn } from "@/lib/gameLogic";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function POST(request) {
  const action = await request.json();
  let updatedGameState;

  switch (action.type) {
    case "start_game":
      updatedGameState = await startGame();
      break;
    case "play_card":
      updatedGameState = await playCard(action);
      break;
    case "end_turn":
      updatedGameState = await endTurn(action);
      break;
    default:
      return NextResponse.json({ error: "Unknown action" });
  }

  console.log("Updated game state:", updatedGameState); // Log the updated state

  // Trigger the Pusher event with the updated game state
  pusher.trigger("game-channel", "game-update", {
    gameState: updatedGameState,
  });

  return NextResponse.json(updatedGameState); // Respond with the updated state
}
