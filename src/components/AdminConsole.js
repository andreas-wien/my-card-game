"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import CardList from "./CardList";

export default function AdminConsole() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [rarityScore, setRarityScore] = useState("");
  const [power, setPower] = useState("");
  const [toughness, setToughness] = useState("");
  const [health, setHealth] = useState("");
  const [effect, setEffect] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  if (!session || !session.user.isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          imageUrl = data.url;
        } else {
          setMessage("Error uploading image.");
          return;
        }
      } catch (error) {
        setMessage("Error uploading image.");
        return;
      }
    }

    const cardData = {
      name,
      type,
      cost: Number(cost),
      rarityScore: Number(rarityScore),
      imageUrl,
      ...(type === "Monster" && {
        power: Number(power),
        toughness: Number(toughness),
        health: Number(health),
      }),
      effect,
    };

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
        setRarityScore("");
        setPower("");
        setToughness("");
        setHealth("");
        setEffect("");
        setImage(null);
      } else {
        setMessage("Error adding card.");
      }
    } catch (error) {
      setMessage("Error adding card.");
    }
  };

  return (
    <div className="admin-console p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Card</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="form-container space-y-4">
        <div className="form-group">
          <label htmlFor="name">Card Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 rounded" />
        </div>
        <div className="form-group">
          <label htmlFor="type">Card Type:</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} required className="border p-2 rounded bg-white text-black">
            <option value="">Select type</option>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cost">Card Cost (Mana):</label>
          <input id="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} required className="border p-2 rounded" />
        </div>
        <div className="form-group">
          <label htmlFor="rarityScore">Rarity Score (0-100):</label>
          <input id="rarityScore" type="number" value={rarityScore} onChange={(e) => setRarityScore(e.target.value)} required className="border p-2 rounded" />
        </div>
        <div className="form-group">
          <label htmlFor="image">Card Image:</label>
          <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border p-2 rounded" />
        </div>
        {type === "Monster" && (
          <>
            <div className="form-group">
              <label htmlFor="power">Power:</label>
              <input id="power" type="number" value={power} onChange={(e) => setPower(e.target.value)} required className="border p-2 rounded" />
            </div>
            <div className="form-group">
              <label htmlFor="toughness">Toughness:</label>
              <input id="toughness" type="number" value={toughness} onChange={(e) => setToughness(e.target.value)} required className="border p-2 rounded" />
            </div>
            <div className="form-group">
              <label htmlFor="health">Health:</label>
              <input id="health" type="number" value={health} onChange={(e) => setHealth(e.target.value)} required className="border p-2 rounded" />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="effect">Card Effect:</label>
          <textarea id="effect" value={effect} onChange={(e) => setEffect(e.target.value)} required className="border p-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Card</button>
      </form>
      <CardList />
    </div>
  );
}
