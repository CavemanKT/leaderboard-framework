const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report3PostRevenue', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mrr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    revenue: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Report1Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Report3PostRevenues',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Report3PostRevenues_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
