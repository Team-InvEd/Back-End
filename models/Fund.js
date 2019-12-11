const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    amount: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Fund", fundSchema);
