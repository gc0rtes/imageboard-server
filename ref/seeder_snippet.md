    //start
        "use strict";
        //Here is the data we want to populate our table(s)
        // npx sequelize-cli db:seed:all //Put data in
        module.exports = {
        up: async (queryInterface, Sequelize) => {
            await queryInterface.bulkInsert(
            "Users",
            [
                {
                name: "Leo Messi",
                email: "leo@messi.com",
                phone: 1234567,
                password: "tes@#t",
                createdAt: new Date(),
                updatedAt: new Date(),
                },
                {
                name: "Dan Abramov",
                email: "dan@redux.com",
                phone: 1234567,
                password: "tes123",
                createdAt: new Date(),
                updatedAt: new Date(),
                },
                {
                name: "Guilherme",
                email: "gui@gmail.com",
                phone: 12300567,
                password: "1235",
                createdAt: new Date(),
                updatedAt: new Date(),
                },
            ],
            {}
            );
        },

        down: async (queryInterface, Sequelize) => {
            await queryInterface.bulkDelete("Users", null, {});
        },
        };
    //end
