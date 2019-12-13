const router = require("express").Router();
const Fund = require("../models/Fund");
const Transaction = require("../models/Transaction");
const theInStates = require("./api/states.json");
const theOutStates = require("./api/out-states.json")

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/funds", async (req, res, next) => {
  try {
    theFunds = await Fund.find();
    res.json({ theFunds });
  } catch (err) {
    next(err);
  }
});
router.post("/donate", async (req, res, next) => {
  const { amount, userId, fundId } = req.body;
  try {
    const newTransaction = new Transaction({ amount, userId, fundId });
    newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    next(error);
  }
});
router.get("/api/states", async (req, res, next) => {
  try {
    res.json(theInStates)
  } catch (err) {
    next(err)
  }
})
router.get("/api/out-states", async (req, res, next) => {
  try {
    res.json(theOutStates)
  } catch (err) {
    next(err)
  }
})
router.get("/donate", async (req, res, next) => {
  try {
    theFunds = await Fund.find();
    res.json({ theFunds });
  } catch (err) {
    next(err);
  }
});

router.get("/fund", async (req, res, next) => {
  try {
    res.json({ msg: "fund message from the API." });
  } catch (err) {
    next(err);
  }
});

router.post("/fund", async (req, res, next) => {
  const { title, description, amount } = req.body;
  const user = req.user;
  try {
    const newFund = new Fund({ user, title, description, amount });
    newFund.save();
    res.json(newFund);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
