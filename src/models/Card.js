import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: String,
  type: String,
  cost: Number,
  power: Number,
  toughness: Number,
  health: Number,
  effect: String,
});

export default mongoose.models.Card || mongoose.model("Card", cardSchema);
