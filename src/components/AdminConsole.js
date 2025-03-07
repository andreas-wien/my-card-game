"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import CardList from "./CardList";

export default function AdminConsole() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [power, setPower] = useState("");
  const [toughness, setToughness] = useState("");
  const [health, setHealth] = useState("");
  const [effect, setEffect] = useState("");
  const [message, setMessage] = useState("");

  if (!session || !session.user.isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardData = { name, type, cost, power, toughness, health, effect };

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      if (res.ok) {
        setMessage("Card added successfully!");
        setName("");
        setType("");
        setCost("");
        setPower("");
        setToughness("");
        setHealth("");
        setEffect("");
      } else {
        setMessage("Error adding card.");
      }
    } catch (error) {
      setMessage("Error adding card.");
    }
  };

  return (
    <div className="admin-console">
      <h2>Add a New Card</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Card Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Card Type:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Card Cost:</label>
          <input
            id="cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="power">Power:</label>
          <input
            id="power"
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toughness">Toughness:</label>
          <input
            id="toughness"
            type="number"
            value={toughness}
            onChange={(e) => setToughness(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="health">Health:</label>
          <input
            id="health"
            type="number"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="effect">Card Effect:</label>
          <textarea
            id="effect"
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Card</button>
      </form>

      {/* Display the list of existing cards below the form */}
      <CardList />
    </div>
  );
}
