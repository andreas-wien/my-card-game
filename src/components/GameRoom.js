import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Card from "./Card"; // Import the Card component

function GameRoom() {
  const [gameState, setGameState] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [opponentCards, setOpponentCards] = useState([]);

  useEffect(() => {
    // Initialize Pusher client
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // Subscribe to the game-channel
    const channel = pusher.subscribe("game-channel");

    // Bind to the game-update event
    channel.bind("game-update", (data) => {
      console.log("Received Pusher event:", data);
      setGameState(data.gameState); // Update the game state
    });

    return () => {
      pusher.unsubscribe("game-channel");
    };
  }, []);

  useEffect(() => {
    // Fetch the card data whenever the game state is updated
    const fetchCards = async () => {
      if (!gameState) return;

      // Get the player's and opponent's hand cardIds
      const playerHand = gameState[gameState.turn].hand;
      const opponentHand =
        gameState[gameState.turn === "player1" ? "player2" : "player1"].hand;

      // Fetch cards for the player's hand by their IDs
      const playerCardsResponse = await Promise.all(
        playerHand.map((cardId) =>
          fetch(`/api/cards/${cardId}`).then((res) => res.json())
        )
      );
      setPlayerCards(playerCardsResponse); // Set player cards

      // Fetch cards for the opponent's hand (only card count, not the actual cards)
      setOpponentCards(opponentHand);
    };

    fetchCards();
  }, [gameState]);

  const startGame = async () => {
    try {
      // Make a POST request to the backend to start the game
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "start_game" }),
      });

      const data = await response.json();
      console.log("Game started:", data);
      setGameState(data.gameState); // Set the initial game state
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handlePlayCard = async (cardId) => {
    // Send play card action to the backend
    const response = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "play_card",
        player: gameState.turn,
        cardId: cardId,
      }),
    });

    const updatedGameState = await response.json();
    if (updatedGameState) {
      console.log("Updated GameState:", updatedGameState);
      setGameState(updatedGameState);
    }
  };

  const handleEndTurn = async () => {
    // Send end turn action to the backend
    const response = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "end_turn",
        player: gameState.turn,
      }),
    });

    const updatedGameState = await response.json();
    if (updatedGameState) {
      console.log("Updated GameState:", updatedGameState);
      setGameState(updatedGameState);
    }
  };

  // Log the game state to check if it's being updated
  console.log("Current GameState:", gameState);

  // Show loading message if game state or cards are not yet initialized
  if (!gameState) {
    return (
      <div>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Game Room</h1>
      <p>Turn: {gameState.turn}</p>

      {/* Player's Hand */}
      <div className="player-hand">
        <h2>Your Hand</h2>
        {gameState[gameState.turn].hand.map((cardId, index) => {
          const card = playerCards.find(
            (c) => c._id.toString() === cardId.toString()
          ); // Find card by _id
          if (!card) return <div key={index}>Card not found</div>;

          return (
            <div key={index} className="inline-block m-2">
              <Card card={card} quantity={1} />
              <button
                onClick={() => handlePlayCard(card._id)}
                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Play {card.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* Opponent's Hand (hidden cards) */}
      <div className="opponent-hand">
        <h2>Opponent Hand</h2>
        <p>{opponentCards.length} cards</p>
      </div>

      {/* Battlefield (monsters in play) */}
      <div className="battlefield">
        <h2>Battlefield</h2>
        {["player1", "player2"].map((player) => (
          <div key={player} className={`${player}-battlefield`}>
            <h3>{player === "player1" ? "Your" : "Opponent's"} Battlefield</h3>
            {gameState[player].hand.map((cardId, index) => {
              const card = playerCards.find(
                (c) => c._id.toString() === cardId.toString()
              );
              if (card && card.type === "Monster") {
                return (
                  <div key={index} className="monster-card">
                    <Card card={card} quantity={undefined} />
                  </div>
                );
              }
              return null; // Only show monster cards
            })}
          </div>
        ))}
      </div>

      {/* End Turn Button */}
      <div className="mt-4">
        <button
          onClick={handleEndTurn}
          className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
        >
          End Turn
        </button>
      </div>
    </div>
  );
}

export default GameRoom;
