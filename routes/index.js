const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/donate", async (req, res, next) => {
  try {
    res.json({ msg: "Message" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
