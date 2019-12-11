const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fund: { type: mongoose.Schema.Types.ObjectId, ref: "Fund" },
    amount: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
