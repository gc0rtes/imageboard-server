    //start
    const User = require("./models").user;

    async function getAllUsers() {
    try {
    // This is how we can use a query method to get all the users from the database
    // Selects all rows. Resolves with a (possibly empty) array
    const allUsers = await User.findAll();
    return allUsers.map(user => user.toJSON());
    } catch (e) {
    console.log(e);
    }
    }

    getAllUsers().then(users => console.log(users));
    //end
