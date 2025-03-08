import connectToDatabase from "@/lib/mongodb";
import Card from "@/models/Card";

export async function GET() {
  await connectToDatabase();
  const cards = await Card.find();
  return new Response(JSON.stringify(cards), { status: 200 });
}

export async function POST(request) {
  await connectToDatabase();
  const cardData = await request.json();
  const newCard = new Card(cardData);
  await newCard.save();
  return new Response(JSON.stringify(newCard), { status: 201 });
}
