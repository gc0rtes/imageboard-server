//1. Import express.
const express = require("express");

//2. Destructure its Router class
const { Router } = express;

//3. Create a new Router instance named router.
const router = new Router();

//4. Register an endpoint with router.get that listens on "/"
router.get("/", (request, response) =>
  response.send("Welcome to the homepage!")
);

//5. Create an new express server named app.
const app = express();

//6. Register the router as middleware
app.use(router);

//7. Define port. Ex: 4000.
const port = 4000;

//8. Exports a class called Router
module.exports = router;

//9. Tell the server to listen on the defined port. And console log were the server is listening
app.listen(port, () => console.log(`Server listening on port ${port}!`));
