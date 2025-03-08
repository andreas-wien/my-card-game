import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function POST(req) {
  try {
    const { channel, event, data } = await req.json();

    // Validate request data
    if (!channel || !event || !data) {
      console.error("Invalid request:", { channel, event, data });
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Triggering Pusher:", { channel, event, data });

    await pusher.trigger(channel, event, data);

    return new Response(JSON.stringify({ message: "Event sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pusher API error:", error);
    return new Response(
      JSON.stringify({
        message: "Error triggering event",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
