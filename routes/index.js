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

router.post('/fund', (req, res, next) => {
  const { user, title, description, amount  } = req.body;
  const newFund = new Fund({ user, title, description, amount })
  newFund.save()
  .then((fund) => {
    res.redirect('/fund/:id');
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;
