//Import/Require Express
const express = require("express");

//Import routers files. Ex: "./routers/image"
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

//Create a new express server named app
const app = express();

//Create app returns the routers
app.use("/images", imageRouter);
app.use("/users", userRouter);

//Define the port
const port = process.env.PORT || 4000; // "const port =4000 ||process.env.PORT" is used when go to deploy on Heruku

// Start/Call listening the server on port 4000 and log it.
app.listen(port, () => console.log(`Server listening on port ${port}`));
