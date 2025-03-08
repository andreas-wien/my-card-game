import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  image: String,
  gold: { type: Number, default: 0 },
  material: { type: Number, default: 0 },
  collectedCards: [{ cardId: String, quantity: Number }],
  decks: [{ name: String, cards: [{ cardId: String, quantity: Number }] }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
