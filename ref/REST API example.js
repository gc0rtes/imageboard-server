const express = require("express");
const app = express();
const PORT = 4000;

// the connection with sequelize starts HERE!
const User = require("./models").Users; //table name

const todoList = require("./models").TodoLists; // table name

//express.json() is the body parser. This means it's what makes the body of a POST (or PATCH, PUT) available.
app.use(express.json());

//***** */
// Example, try it with express json and without

// Command: http POST :4000/test_body anything="some param"

// app.post("/test_body", (req, res, next) => {
//   console.log(req.body);});

//Without you I'll undefined.

//***** */

//********** */
// Todo List //
//********** */

//Implement a GET endpoint for all todoLists
//Ex: http -v get :4000/todolists
app.get("/todolists", async (request, response, next) => {
  try {
    console.log("I got a request for the todo list");
    const allLists = await todoList.findAll();
    response.send(allLists);
  } catch (e) {
    next(e);
  }
});

//CREATE a list on todoList. We need to send a user id also.
//Ex: http -v POST :4000/todolists name="Movies to watch" userId=5
app.post("/todolists", async (request, response, next) => {
  try {
    console.log("I got a request to CREATE a new list");
    const user = await todoList.create(request.body);
    response.json(user);
  } catch (e) {
    next(e);
  }
});

//UPDATE a list on todoList. We need to check if the list id exists. If so update it.
//Ex: http -v PUT :4000/todolists/6 name="Cities to go in Europe"
app.put("/todolists/:listId", async (req, res, next) => {
  try {
    console.log("I got a request to UPDATE a new list: ");
    const listId = parseInt(req.params.listId); //get list id input
    const listToUpdate = await todoList.findByPk(listId); //look for user
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

//********** */
// TODO   //
//********** */
// Read a user's list:  get all the list for one user
//reader.codaisseur.com/courses/backend-bootcamp/02-orm/rest-in-express/restful-api

//********** */
// Users     //
//********** */

//Send a response to GET requests to /users
//Ex: http -v get :4000/users
https: app.get("/users", async (request, response, next) => {
  try {
    console.log("I got a request for the user list");
    const allUsers = await User.findAll();
    response.send(allUsers);
  } catch (e) {
    next(e);
  }
});

//Obs: Is important to send a status(404) when data is not found
// 1. Just being proper and abiding to REST principles
// 2. Because axios later in the frontend will interpret/handle requests in a different way when they are 200 (all good) or 400/500. So besides the actual text message we send our frontend will understand when a request was successful and when it failed due to the code
//Send a response to GET requests to /users/:userId
//Ex: http -v get :4000/users/1
app.get("/users/:userId", async (request, response, next) => {
  try {
    console.log("I got a request for user/id:");
    const id = parseInt(request.params.userId); //to get what user wrote
    const userById = await User.findByPk(id);
    console.log("userById: ", userById);
    if (!userById) {
      response.status(404).send("User not found");
    } else {
      response.send(userById);
    }
  } catch (e) {
    next(e);
  }
});

// CREATE a new user account.
//Ex: http -v POST :4000/users name="Firstname Lastname" email=user@aon.com
app.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body); //Here we pass the body of the request directly to our model.
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//UPDATE - The update is a two step process. First we load the user, and then (if it exists), we update it
//Ex: http -v PUT :4000/users/11 name=Anna

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId); //get user id input
    const userToUpdate = await User.findByPk(userId); //look for user
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));

//to run it: $ node index.js or $ npx nodemon index.js

// some httpie commands
//http POST :4000/users email=eg@eg.com email=route@express.com
//name="FirstName LastName" need to put the name inside "" if you plan to put a space in the middle
//http POST :4000/users name=Nelson" "Mandela email=freethepeople@suidafrika.sa password=iwenttojailandnowimhere123

//*** */
// The code bellow is just to see if server is working
//Test with: $ http POST :4000/echo_test hello=world

// app.post("/echo_test", (request, response) => {
//   response.json(request.body);
// });
//*** */
