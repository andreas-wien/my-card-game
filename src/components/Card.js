"use client";

import { useMemo } from "react";
import Image from "next/image";

function getRarityCategory(rarityScore) {
  if (rarityScore < 15) return "Basic";
  if (rarityScore < 30) return "Common";
  if (rarityScore < 45) return "Uncommon";
  if (rarityScore < 60) return "Rare";
  if (rarityScore < 75) return "Epic";
  if (rarityScore < 90) return "Mythical";
  return "Legendary";
}

export default function Card({ card }) {
  const rarity = useMemo(() => getRarityCategory(card.rarityScore), [card.rarityScore]);

  if (!card || !card.name) {
    return <div className="text-center text-red-500">Invalid Card Data</div>;
  }

  return (
    <div className="card border rounded shadow p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="card-header mb-2">
        <h3 className="text-xl font-bold">{card.name}</h3>
        <p>
          <strong>Rarity:</strong> {rarity} ({card.rarityScore})
        </p>
      </div>
      {card.imageUrl ? (
        <Image
          src={card.imageUrl}
          alt={card.name}
          width={150}
          height={150}
          className="rounded border-black border-2 mb-2 mx-auto"
          loading="lazy"
        />
      ) : (
        <div className="mb-2 mx-auto w-32 h-32 bg-gray-200 flex items-center justify-center text-center text-gray-500">No Image</div>
      )}
      <div className="card-body mb-2">
        <p>
          <strong>Type:</strong> {card.type}
        </p>
        <p>
          <strong>Cost:</strong> {card.cost}
        </p>
        {card.type === "Monster" && (
          <>
            <p>
              <strong>Power:</strong> {card.power}
            </p>
            <p>
              <strong>Toughness:</strong> {card.toughness}
            </p>
            <p>
              <strong>Health:</strong> {card.health}
            </p>
          </>
        )}
        {card.type === "Spell" && (
          <p className="italic text-gray-600">
            This is a Spell card. (Define target or additional effects as
            needed.)
          </p>
        )}
        {card.type === "Equipment" && (
          <p className="italic text-gray-600">
            This is an Equipment card. (Select a monster to boost its stats.)
          </p>
        )}
      </div>
      <div className="card-effect border-t pt-2">
        <p>
          <strong>Effect:</strong> {card.effect}
        </p>
      </div>
    </div>
  );
}
