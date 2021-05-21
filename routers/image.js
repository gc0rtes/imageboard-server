//Import the Router class from express.
const { Router } = require("express");

//Import tables from ./models or ../models (pay attention!). Singular Capitalized.
const Image = require("../models").images;

//Create a new Router instance.
const router = new Router();

//Register a Root "/" GET endpoint to send all images
router.get("/", async (req, res) => {
  try {
    console.log("i got a request for the user list");
    const allImages = await Image.findAll();
    res.send(allImages);
  } catch (e) {
    console.log(e.message);
  }
});

//Export the router.
module.exports = router;
