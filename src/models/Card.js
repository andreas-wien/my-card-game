import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Monster", "Spell", "Equipment"],
    required: true,
  },
  cost: { type: Number, required: true },
  power: { type: Number, default: null },
  toughness: { type: Number, default: null },
  health: { type: Number, default: null },
  effect: { type: String, default: "" },
  rarityScore: { type: Number, required: true },
  imageUrl: { type: String, default: "", required: true },
});

cardSchema.pre("save", function (next) {
  if (this.type === "Monster") {
    if (this.power == null || this.toughness == null || this.health == null) {
      return next(
        new Error("Monster cards must have power, toughness, and health")
      );
    }
  }
  next();
});

export default mongoose.models.Card || mongoose.model("Card", cardSchema);
