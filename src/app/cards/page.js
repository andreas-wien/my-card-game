'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch('/api/cards');
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
