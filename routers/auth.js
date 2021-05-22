//Import the Router class from express.
const { Router } = require("express");

//Import the two jsonwebtoken library functions from path/file
const { toJWT, toData } = require("../auth/jwt");

//Import tables from ./models. Singular Capitalized.
const User = require("../models").users;

//Import/require bcrypt algorithm.
const bcrypt = require("bcrypt");

//Create a new Router instance.
const router = new Router();

//Add a "/login" POST endpoint
//OBS: this is a tutorial auth. With hardcoded answer
//Ex: http -v post :4000/auth/login email=gui password=123
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please supply an email and password");
  } else {
    // 1. find user based on email address
    const userChecked = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!userChecked) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    //2. use bcrypt.compareSync to check the received password (first argument) against the stored hash second argument
    else if (bcrypt.compareSync(password, userChecked.password)) {
      //3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: userChecked.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
  }
});

module.exports = router;
