//Import the Router class from express.
const { Router } = require("express");

//Import the two jsonwebtoken library functions from path/file
const { toJWT, toData } = require("../auth/jwt");

//Import tables from ./models. Singular Capitalized.
const User = require("../models").users;

//Import/require bcrypt algorithm.
const bcrypt = require("bcrypt");

//Import/require authMiddleware from path/file
const authMiddleware = require("../auth/middleware");

//Create a new Router instance.
const router = new Router();

//Register/Add authMiddleware to a GET test route
//Second: use your token to access this route
//http -v get :4000/auth/test-auth Authorization:"Bearer <token>"
router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

//Add a "/login" POST endpoint
// First: Get your JWToken at:
//http -v post :4000/auth/login email=jesus@nazare.com password=123
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please supply an email and password");
  } else {
    // 1. find user based on email address
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    //2. use bcrypt.compareSync to check the received password (first argument) against the stored hash second argument
    else if (bcrypt.compareSync(password, user.password)) {
      //3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id }); //userId will be used on middleware to findByPk(data.userId)
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
