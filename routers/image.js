//Import the Router class from express.
const { Router } = require("express");

//Import tables from ./models or ../models (pay attention!). Singular Capitalized.
const Image = require("../models").images;

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
