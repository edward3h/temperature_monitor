"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Temperatures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kind: {
        type: Sequelize.STRING,
      },
      source: {
        type: Sequelize.STRING,
      },
      degreesf: {
        type: Sequelize.INTEGER,
      },
      outside: {
        type: Sequelize.BOOLEAN,
      },
      mode: {
        type: Sequelize.STRING,
      },
      modesetting: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Temperatures");
  },
};
