//Import the Router class from express.
const { Router } = require("express");

//Import tables from ./models or ../models (pay attention!). Singular Capitalized.
const Image = require("../models").images;

//Import the two jsonwebtoken library functions from path/file
const { toJWT, toData } = require("../auth/jwt");

//Create a new Router instance.
const router = new Router();

//Register a Root "/" GET endpoint to send all images
router.get("/", async (req, res, next) => {
  try {
    console.log("i got a request for the image list");
    const allImages = await Image.findAll();
    res.send(allImages);
  } catch (e) {
    next(e);
  }
});

//testing a new endpoint. Add protection to our endpoint
// To test it first make a request for a new JWT:
//http -v post :4000/auth/login email=gui password=123
//Then test it on the protected router url :4000/images/messy Authorization:"Bearer <token>"

router.get("/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

//Register "/:imageId" GET endpoint to pick ONE image
router.get("/:imageId", async (request, response, next) => {
  try {
    console.log("I got a request for /:imageId");
    const id = parseInt(request.params.imageId); //to get what user wrote
    const imageById = await Image.findByPk(id);
    if (!imageById) {
      response.status(404).send("Image not found");
    } else {
      response.send(imageById);
    }
  } catch (e) {
    next(e);
  }
});

//Add a Root "/" POST endpoint that creates a new image in the database.
//Add a parameter constrain on title its not allowNull on model
//Ex: http -v POST :4000/images title="Beach The Hague" url=https://dutchreview.com/wp-content/uploads/TheBeautyTheHague-1-3.jpg
router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title) {
      res.status(400).send("missing title parameter");
    } else {
      const createImage = await Image.create({
        title,
        url,
      });
      res.json(createImage);
    }
  } catch (e) {
    next(e);
  }
});

//Export the router.
module.exports = router;
