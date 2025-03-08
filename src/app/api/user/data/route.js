import { auth } from "@/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await User.findOne({ email: session.user.email })
    .populate("collectedCards.cardId")
    .populate("decks.cards.cardId");

  return new Response(JSON.stringify(user), { status: 200 });
}
