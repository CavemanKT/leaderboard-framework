const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report1', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    profitability: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    achievement: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
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
