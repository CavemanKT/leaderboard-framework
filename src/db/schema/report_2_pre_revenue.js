const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report2PreRevenue', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pickedStage2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    totalWaitingList: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Report1Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Report2PreRevenues',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Report2PreRevenues_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
