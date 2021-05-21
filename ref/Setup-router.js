// Separate a Router

//1. Import the Router class from express.
const { Router } = require("express");

//2. Create/Instantiate a new Router instance.
const router = new Router();

//3. Register a GET endpoint on the / route
router.get("/", (req, res) => {
  res.send("Separated");
});

//4. Export the router.
module.exports = router;
