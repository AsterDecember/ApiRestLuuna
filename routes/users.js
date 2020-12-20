let express = require('express');
let router = express.Router();
const User = require('../models/User')
const {getDbObject} = require('../middleware/getDbObject.js');

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getDbObject(User), (req, res) => {
  res.json(res.dbObject);
});

router.put("/:id", getDbObject(User), async (req, res) => {
  try {
    const updatedUser = await res.dbObject.set(req.body)
    const dbUpdatedUser = await updatedUser.save();
    res.json(dbUpdatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getDbObject(User), async (req, res) => {
try {
  await res.dbObject.deleteOne();
  res.json({ message: "User has been deleted" });
} catch (err) {
  res.status(400).json({ message: err.message });
}
});

module.exports = router;
