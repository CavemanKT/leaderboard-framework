const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report1', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pickedStage1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weeklyAchievement: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weeklyPlan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Report1s',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Report1s_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
