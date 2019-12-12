const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fundId: { type: mongoose.Schema.Types.ObjectId, ref: "Fund" },
    amount: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
