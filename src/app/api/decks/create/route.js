import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { deckName, cards } = await req.json();
  if (!deckName || !Array.isArray(cards) || cards.length === 0) {
    return new Response(JSON.stringify({ error: "Invalid deck data" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ email: session.user.email });

  // Ensure user owns all cards
  const collectedCardsMap = new Map(
    user.collectedCards.map((c) => [c.cardId, c.quantity])
  );

  for (const { cardId, quantity } of cards) {
    if (
      !collectedCardsMap.has(cardId) ||
      collectedCardsMap.get(cardId) < quantity
    ) {
      return new Response(
        JSON.stringify({ error: `Not enough copies of card ID ${cardId}` }),
        { status: 400 }
      );
    }
  }

  // Save deck
  user.decks.push({ name: deckName, cards });
  await user.save();

  return new Response(JSON.stringify({ message: "Deck created!", user }), {
    status: 200,
  });
}
