const router = require("express").Router();
const Fund = require("../models/Fund");


router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/funds", async (req, res, next) => {
  try {
    theFunds = await Fund.find();
    res.json({theFunds});
  } catch (err) {
    next(err);
  }
});

router.get("/donate", async (req, res, next) => {
  try {
    theFunds = await Fund.find();
    res.json({theFunds});
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
