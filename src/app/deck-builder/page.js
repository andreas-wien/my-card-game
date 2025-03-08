"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function DeckBuilder() {
  const [userData, setUserData] = useState(null);
  const [cards, setCards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch("/api/user/data")
      .then((res) => res.json())
      .then((data) => setUserData(data));

    // Fetch full card data from the "cards" collection
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const handleAddCard = (card) => {
    if (!card || !card._id) return;

    // Find the card in the selected cards list to check the quantity
    const existing = selectedCards.find((c) => c.cardId === card._id);
    // Get the quantity the user has collected
    const userCardData = userData.collectedCards.find(
      (c) => c.cardId === card._id
    );

    const userCardQuantity = userCardData ? userCardData.quantity : 0;

    if (existing) {
      // If the user has collected fewer cards than in the deck, prevent adding more
      if (existing.quantity >= userCardQuantity) {
        alert(`You can't add more of this card than you have collected.`);
        return; // Exit early without updating state
      }

      // Otherwise, update the card quantity
      setSelectedCards((prev) =>
        prev.map((c) =>
          c.cardId === card._id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      // If the card is not in the deck yet, add it with quantity 1
      setSelectedCards((prev) => [
        ...prev,
        { cardId: card._id, name: card.name, quantity: 1 },
      ]);
    }
  };

  const handleRemoveCard = (cardId) => {
    setSelectedCards(
      (prev) => prev.filter((card) => card.cardId !== cardId) // Remove card by cardId
    );
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/decks/create", {
      method: "POST",
      body: JSON.stringify({ deckName, cards: selectedCards }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Deck created!");
      setSelectedCards([]);
      setDeckName("");
    } else {
      alert("Failed to create deck");
    }
  };

  if (!userData || !cards.length) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h1>Deck Builder</h1>
      <input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder="Deck Name"
      />

      <h2>Collected Cards</h2>
      <div className="card-list">
        {userData.collectedCards.map(({ cardId, quantity }) => {
          // Find the full card object using the cardId
          const card = cards.find((c) => c._id === cardId);
          if (!card) return null; // Skip if card is not found

          return (
            <div key={`${card._id}-${quantity}`} className="card-container">
              <Card
                card={card} // Pass the full card object to the Card component
                quantity={quantity} // Pass quantity to the Card component
              />
              <button onClick={() => handleAddCard(card)}>Add to Deck</button>
            </div>
          );
        })}
      </div>

      <h2>Selected Cards</h2>
      <div className="card-list">
        {selectedCards.map(({ cardId, quantity }) => {
          // Find the card object from the full cards data
          const card = cards.find((c) => c._id === cardId);
          return (
            <div key={`${cardId}-${quantity}`} className="card-container">
              {card && (
                <Card
                  card={card} // Pass the full card object to the Card component
                  quantity={quantity} // Pass quantity to the Card component
                />
              )}
              <button onClick={() => handleRemoveCard(cardId)}>
                Remove from Deck
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          disabled={!deckName || selectedCards.length === 0}
          className="save-deck-btn"
        >
          Save Deck
        </button>
      </div>
    </div>
  );
}
