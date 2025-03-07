'use client';

export default function Card({ card }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{card.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>Type:</strong> {card.type}</p>
        <p><strong>Cost:</strong> {card.cost}</p>
        <p><strong>Power:</strong> {card.power}</p>
        <p><strong>Toughness:</strong> {card.toughness}</p>
        <p><strong>Health:</strong> {card.health}</p>
      </div>
      <div className="card-effect">
        <p><strong>Effect:</strong> {card.effect}</p>
      </div>
    </div>
  );
}
