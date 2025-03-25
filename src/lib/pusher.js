import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function triggerGameUpdate(gameState) {
  try {
    // Trigger the Pusher event for all connected clients
    await pusher.trigger("game-channel", "game-update", {
      gameState: gameState,
    });
  } catch (error) {
    console.error("Pusher event trigger error:", error);
  }
}
