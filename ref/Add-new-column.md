// In this example we use a new migration to add a new column "important" to the Table "todoItems"

    "use strict";

    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
          "todoItems", //Table name
          "important", // Column name
          { type: Sequelize.BOOLEAN },
          {}
        );
      },

      down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("todoItems", "important", {});
      },
    };
