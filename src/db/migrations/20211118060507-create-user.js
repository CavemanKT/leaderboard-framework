module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      domain: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      socialUserId: {  // for github account
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      revenueModelType: {
        type: Sequelize.STRING
      },
      registrationType: {
        type: Sequelize.ENUM('email')  // to specify which method you use to login the website, add 'facebook', 'google', 'github' if you want to use them
      },
      role: {
        type: Sequelize.STRING  // could be 'candidate', 'inspector', 'admin'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users')
  }
}
