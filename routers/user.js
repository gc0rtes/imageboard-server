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

//Add a Root "/" POST endpoint that creates a new user
//Add a parameters constrains on email password fullName
//Ex: http -v POST :4000/users email=gui@gui.com password=123 fullName="Guilherme Cortes"
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing  parameters");
    } else {
      const createUser = await User.create({
        email,
        password,
        fullName,
      });
      res.json(createUser);
    }
  } catch (e) {
    next(e);
  }
});

//Export the router.
module.exports = router;
