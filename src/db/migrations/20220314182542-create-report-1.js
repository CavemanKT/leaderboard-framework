'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Report1s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pickedStage1: {
        type: Sequelize.STRING
      },
      weeklyAchievement: {
        type: Sequelize.TEXT
      },
      weeklyPlan: {
        type: Sequelize.TEXT
      },
      score: {
        type: Sequelize.INTEGER
      },
      ProfileId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Report1s');
  }
};