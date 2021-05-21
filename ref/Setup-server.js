//1. Import Express
const express = require("express");

//2. Import routers files. ex: "./routers/image"
const router = require("./router");

//3. Create a new express server named app
const app = express();

//4. Register the router with app.use.
app.use(router);

//5. Define the port
const port = 4000; // "const port =4000 ||process.env.PORT" is used when go to deploy on Heruku

//6. Start the server on port 4000 and log it.
app.listen(port, () => console.log(`Server listening on port ${port}`));
