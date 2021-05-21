//Import/Require Express
const express = require("express");

//Import router from file

//Create a new express server named app
const app = express();

//Define the port
const port = process.env.PORT || 4000; //process.env.PORT is used when go to deploy on Heruku

// Start/Call listening the server on port 4000 and log it.
app.listen(port, () => console.log(`Server listening on port ${port}`));
