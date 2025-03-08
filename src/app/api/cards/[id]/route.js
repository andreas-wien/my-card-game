import dbConnect from "@/lib/mongodb";
import Card from "@/models/Card";

export async function DELETE(req, { params }) {
  const { id } = await params; // Get the card ID from URL params

  await dbConnect();

  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return new Response(JSON.stringify({ message: "Card not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ message: "Card deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting card" }), {
      status: 500,
    });
  }
}
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const cardData = await request.json();

  try {
    const updatedCard = await Card.findByIdAndUpdate(id, cardData, {
      new: true, // return the updated document
      runValidators: true, // run schema validation
    });

    if (!updatedCard) {
      return new Response(JSON.stringify({ message: "Card not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedCard), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating card", error: error.message }),
      { status: 500 }
    );
  }
}
