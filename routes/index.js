const router = require("express").Router();
const Fund = require("../models/Fund");
const User = require("../models/User")
const Transaction = require("../models/Transaction");
const theInStates = require("./api/states.json");
const theOutStates = require("./api/out-states.json");

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
router.get("/api/transactions", async (req, res, next) => {
  try {
    theT = await Transaction.find().populate("userId")
    res.json({
      theT
    });
  } catch (err) {
    next(err);
  }
});
router.get("/api/users", async (req, res, next) => {
  try {
    theU = await User.find();
    res.json({
      theU
    }
    );
  } catch (err) {
    next(err);
  }
});
router.post("/donate", async (req, res, next) => {
  const { amount, userId, userName, fundId, comment } = req.body;
  try {
    const newTransaction = new Transaction({ amount, userId, userName, fundId, comment });
    newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    next(error);
  }
});
router.get("/api/states", async (req, res, next) => {
  try {
    res.json(theInStates);
  } catch (err) {
    next(err);
  }
});
router.get("/api/out-states", async (req, res, next) => {
  try {
    res.json(theOutStates);
  } catch (err) {
    next(err);
  }
});
router.get("/donate", async (req, res, next) => {
  try {
    theFunds = await Fund.find();
    res.json({ theFunds });
  } catch (err) {
    next(err);
  }
});

router.get("/myStuff", isAuth, async (req, res, next) => {
  try {
    theFunds = await Fund.find({ userId: req.user._id });
    theTransactions = await Transaction.find({ userId: req.user._id }).populate("fundId");
    res.json({ theFunds, theTransactions });
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

router.post("/fund", isAuth, async (req, res, next) => {
  const { title, description, amount } = req.body;
  const userId = req.user._id;
  const creator = re.user.name;
  try {
    const newFund = new Fund({ userId, title, description, amount, creator });
    newFund.save();
    res.json(newFund);
  } catch (error) {
    console.log(error);
  }
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "User is not currently logged in." });
}
module.exports = router;
