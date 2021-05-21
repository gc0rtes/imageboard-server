ref: https://reader.codaisseur.com/courses/backend-bootcamp/01-databases/querying

Create a file on root, ex: sample-query.js and copy the following code:

    const User = require("./models").user; //pay attention to your TABLE NAME inside e.g. migrations/file 'queryInterface.createTable("Users")'

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

Now you can run to test your query:

`node sample-query.js`

There are lots of different ways in which you can query your database through your models. Here are some more examples. Try them out separately in your file!

    // add this at the the top of your file - you'll need it for a query later on
    const { Op } = require("sequelize");

    // Select all rows where firstName === 'Dave', but only return the first one.


    // Resolves with an object or undefined (if no matching rows exist)
    const specificUser = await User.findOne({ where: { name: "Dave" } });

    // Select a row by its primary key. Resolves with an object or undefined (if no matching rows exist)
    const userByPk = await User.findByPk(3);


    // A query using a numeric operator
    const tallUsers = await User.findAll({
      // WHERE height >= 175
      where: {
        height: {
          [Op.gte]: 175, // gte stands for 'greater than or equal'
        },
      },
    });

To use these operators we must also import them from sequelize using

`const { Op } = require("sequelize");`

A common use-case is to take a long list of results and allow users to step through them page by page. We can limit the number of results, but it's also useful to know how many results there would have been. So, we not only want part of the results, but also a count of all results for our current query. Here is how you do that:

    try {
      const result = await Project.findAndCountAll({
        where: {
          title: {
            [Sequelize.Op.like]: "foo%",
          },
        },
        offset: 10,
        limit: 2,
      });

      console.log(result.count);
      console.log(result.rows);
    } catch (e) {
      console.error(e);
    }
