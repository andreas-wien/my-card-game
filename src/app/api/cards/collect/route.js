import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Card from "@/models/Card";

export async function POST(req) {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { cardId, quantity } = await req.json();
  if (!cardId || quantity <= 0) {
    return new Response(JSON.stringify({ error: "Invalid data" }), {
      status: 400,
    });
  }

  const card = await Card.findById(cardId);
  if (!card) {
    return new Response(JSON.stringify({ error: "Card not found" }), {
      status: 404,
    });
  }

  const user = await User.findOne({ email: session.user.email });
  const existingCard = user.collectedCards.find((c) => c.cardId === cardId);

  if (existingCard) {
    existingCard.quantity += quantity;
  } else {
    user.collectedCards.push({ cardId, quantity });
  }

  await user.save();

  return new Response(JSON.stringify({ message: "Card collected!", user }), {
    status: 200,
  });
}
