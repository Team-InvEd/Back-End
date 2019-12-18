const router = require("express").Router();
const Fund = require("../models/Fund");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const theInStates = require("./api/states.json");
const theOutStates = require("./api/out-states.json");
const uploader = require("../config/cloudinary-setup");
const stripe = require("stripe")("sk_test_Xdnh7CVko2Jm1U8ViAFYfzBm00jXBYx46C");

stripe.charges.retrieve("ch_1FqLXYCnwTOupfQYXNQAxoAA", {
  api_key: "sk_test_Xdnh7CVko2Jm1U8ViAFYfzBm00jXBYx46C"
});

router.post("/api/upload", uploader.single("imageUrl"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/funds", async (req, res, next) => {
  try {
    theFunds = await Fund.find().populate("userId");
    res.json({ theFunds });
  } catch (err) {
    next(err);
  }
});
router.get("/api/transactions", async (req, res, next) => {
  try {
    theT = await Transaction.find().populate("userId");
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
    });
  } catch (err) {
    next(err);
  }
});
router.post("/donate", async (req, res, next) => {
  const { amount, userId, userName, fundId, comment } = req.body;
  try {
    const newTransaction = new Transaction({
      amount,
      userId,
      userName,
      fundId,
      comment
    });
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
  // console.log(req.user._id)
  try {
    theFunds = await Fund.find({ userId: req.user._id });
    console.log(theFunds, req.user._id);
    theTransactions = await Transaction.find({ userId: req.user._id }).populate(
      "fundId"
    );
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
  const { title, description, amount, imageUrl } = req.body;
  const userId = req.user._id;
  const userName = req.user.name;
  try {
    const newFund = new Fund({
      userId,
      userName,
      title,
      description,
      amount,
      imageUrl
    });
    newFund.save((err, doc) => {
      if (!err) {
        res.json(doc);
      }
      throw err;
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/fund/delete", isAuth, async (req, res, next) => {
  try {
    let x = await Fund.findByIdAndRemove(req.body.id);
    res.json(x);
  } catch (err) {
    next(err);
  }
});


router.post("/user", isAuth, async (req, res, next) => {
  const id = req.user._id
  const { calculations } = req.body
  try {
    let x = await User.findByIdAndUpdate(id, { calculations });
    res.json(x)
  } catch (err) {
    next(err);
    res.json({err})
  }
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "User is not currently logged in." });
}
module.exports = router;
