// Initial Game State
export async function startGame() {
  const initialState = {
    player1: {
      health: 30,
      mana: 1,
      hand: ["67cc25c647517f81dd41a4f0", "67cc25ff47517f81dd41a4f3"],
      deck: ["67cc25c647517f81dd41a4f0", "67cc25c647517f81dd41a4f0"],
    },
    player2: {
      health: 30,
      mana: 2,
      hand: ["67cc25c647517f81dd41a4f0", "67cc25ff47517f81dd41a4f3"],
      deck: ["67cc25c647517f81dd41a4f0", "67cc25c647517f81dd41a4f0"],
    },
    turn: "player1", // It's player1's turn to start
  };

  return initialState;
}

// Play a card logic
export async function playCard(action) {
  const { player, cardId } = action;
  let updatedState = { ...state }; // Make a copy of the state

  // Example card cost mapping
  const cardCosts = {
    card1: 1,
    card2: 2,
    card3: 1,
    card4: 3,
    card5: 2,
    card6: 1,
    card7: 2,
    card8: 1,
  };

  // Get the player's state
  const playerState = updatedState[player];
  const cardIndex = playerState.hand.indexOf(cardId);

  // If the card is not in the hand, return null
  if (cardIndex === -1) {
    console.log(`Card ${cardId} not found in ${player}'s hand`);
    return null;
  }

  // Get the card's cost
  const cardCost = cardCosts[cardId];

  // If the player has enough mana, play the card
  if (playerState.mana >= cardCost) {
    // Reduce mana
    playerState.mana -= cardCost;

    // Remove card from hand
    playerState.hand.splice(cardIndex, 1);

    // Apply card effects (example)
    // Example: You can modify player stats like health, mana, etc.
    // For instance:
    // playerState.health -= 5; // If the card reduces health by 5 points

    // Return the updated state
    return updatedState;
  } else {
    console.log(`${player} does not have enough mana to play ${cardId}`);
    return null; // Not enough mana to play the card
  }
}

// End turn logic
export async function endTurn(action) {
  const { player } = action;
  let updatedState = { ...state }; // Make a copy of the current state

  // Switch the turn
  updatedState.turn = updatedState.turn === "player1" ? "player2" : "player1";

  // Increase mana for the new player
  const currentPlayer = updatedState[updatedState.turn];
  currentPlayer.mana += 1;

  // Optionally, draw a card for the new player
  if (currentPlayer.deck.length > 0) {
    const drawnCard = currentPlayer.deck.pop();
    currentPlayer.hand.push(drawnCard);
  }

  return updatedState;
}
