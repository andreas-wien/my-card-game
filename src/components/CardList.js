"use client";

import { useState, useEffect } from "react";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch the existing cards
  useEffect(() => {
    async function fetchCards() {
      const res = await fetch("/api/cards");
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, []);

  // Handle delete
  const handleDelete = async (cardId) => {
    try {
      const res = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Card deleted successfully!");
        // Remove the card from the state without re-fetching
        setCards(cards.filter((card) => card._id !== cardId));
      } else {
        setMessage("Error deleting card.");
      }
    } catch (error) {
      setMessage("Error deleting card.");
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updatedCard = { ...selectedCard };

    try {
      const res = await fetch(`/api/cards/${selectedCard._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCard),
      });

      if (res.ok) {
        setMessage("Card updated successfully!");
        setEditMode(false);
        setSelectedCard(null);
        // Re-fetch the cards
        const res = await fetch("/api/cards");
        const data = await res.json();
        setCards(data);
      } else {
        setMessage("Error updating card.");
      }
    } catch (error) {
      setMessage("Error updating card.");
    }
  };

  return (
    <div>
      {message && <p style={{ color: "#e0e0e0" }}>{message}</p>}
      <h2>Existing Cards</h2>

      {/* Edit Form */}
      {editMode && selectedCard && (
        <form onSubmit={handleEditSubmit}>
          <div>
            <label htmlFor="name">Card Name:</label>
            <input
              id="name"
              type="text"
              value={selectedCard.name}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="type">Card Type:</label>
            <input
              id="type"
              type="text"
              value={selectedCard.type}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, type: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="cost">Card Cost:</label>
            <input
              id="cost"
              type="number"
              value={selectedCard.cost}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, cost: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="power">Power:</label>
            <input
              id="power"
              type="number"
              value={selectedCard.power}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, power: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="toughness">Toughness:</label>
            <input
              id="toughness"
              type="number"
              value={selectedCard.toughness}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, toughness: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="effect">Card Effect:</label>
            <textarea
              id="effect"
              value={selectedCard.effect}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, effect: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Update Card</button>
        </form>
      )}

      {/* Display Existing Cards */}
      <div className="card-list text-gray-900">
        {cards.map((card) => (
          <div key={card._id} className="card">
            <h3>{card.name}</h3>
            <p>{card.effect}</p>
            <button
              onClick={() => {
                setSelectedCard(card);
                setEditMode(true);
              }}
              className="btn-edit"
            >
              Edit Card
            </button>
            <button
              onClick={() => handleDelete(card._id)}
              className="btn-delete"
            >
              Delete Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
