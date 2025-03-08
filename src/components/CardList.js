"use client";

import { useState, useEffect } from "react";
import Card from "./Card"; // Import the Card component

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch existing cards
  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("/api/cards");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        setMessage("Error fetching cards.");
      }
    }
    fetchCards();
  }, []);

  // Handle card deletion
  const handleDelete = async (cardId) => {
    try {
      const res = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("Card deleted successfully!");
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
        const res2 = await fetch("/api/cards");
        const data = await res2.json();
        setCards(data);
      } else {
        setMessage("Error updating card.");
      }
    } catch (error) {
      setMessage("Error updating card.");
    }
  };

  // Helper to update selectedCard state
  const handleChange = (field, value) => {
    setSelectedCard({ ...selectedCard, [field]: value });
  };

  return (
    <div>
      {message && <p style={{ color: "#e0e0e0" }}>{message}</p>}
      <h2>Existing Cards</h2>

      {/* Edit Form */}
      {editMode && selectedCard && (
        <form onSubmit={handleEditSubmit} className="mb-4 p-4 border rounded">
          <div>
            <label htmlFor="name">Card Name:</label>
            <input
              id="name"
              type="text"
              value={selectedCard.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Card Type:</label>
            <select
              id="type"
              value={selectedCard.type || ""}
              onChange={(e) => handleChange("type", e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="Monster">Monster</option>
              <option value="Spell">Spell</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>
          <div>
            <label htmlFor="cost">Card Cost (Mana):</label>
            <input
              id="cost"
              type="number"
              value={selectedCard.cost || 0}
              onChange={(e) => handleChange("cost", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="rarityScore">Rarity Score (0-100):</label>
            <input
              id="rarityScore"
              type="number"
              value={selectedCard.rarityScore || 0}
              onChange={(e) =>
                handleChange("rarityScore", Number(e.target.value))
              }
              required
            />
          </div>
          {selectedCard.type === "Monster" && (
            <>
              <div>
                <label htmlFor="power">Power:</label>
                <input
                  id="power"
                  type="number"
                  value={selectedCard.power || 0}
                  onChange={(e) =>
                    handleChange("power", Number(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="toughness">Toughness:</label>
                <input
                  id="toughness"
                  type="number"
                  value={selectedCard.toughness || 0}
                  onChange={(e) =>
                    handleChange("toughness", Number(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="health">Health:</label>
                <input
                  id="health"
                  type="number"
                  value={selectedCard.health || 0}
                  onChange={(e) =>
                    handleChange("health", Number(e.target.value))
                  }
                  required
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="effect">Card Effect:</label>
            <textarea
              id="effect"
              value={selectedCard.effect || ""}
              onChange={(e) => handleChange("effect", e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Card</button>
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setSelectedCard(null);
            }}
            className="ml-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display Existing Cards */}
      <div className="card-list">
        {cards.map((card) => (
          <div key={card._id} className="card border p-4 m-2 rounded">
            {/* Using Card component */}
            <Card card={card} />
            <button
              onClick={() => {
                setSelectedCard(card);
                setEditMode(true);
              }}
              className="btn-edit mr-2"
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
