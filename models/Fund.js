const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Fund", fundSchema);
