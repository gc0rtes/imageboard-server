//Import the Router class from express.
const { Router } = require("express");

//Import tables from ./models. Singular Capitalized.
const User = require("../models").users;

//Create a new Router instance.
const router = new Router();

//Register a Root "/" GET endpoint to send all users
router.get("/", async (req, res) => {
  try {
    console.log("i got a request for the user list");
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    console.log(e.message);
  }
});

//Export the router.
module.exports = router;
