'use strict';
const {
  Model
} = require('sequelize')

const Report3PostRevenueSchema = require('../schema/report_3_post_revenue')

module.exports = (sequelize, DataTypes) => {
  class Report3PostRevenue extends Model {
    static associate(models) {
      Report3PostRevenue.Report1 = this.belongsTo(models.Report1)
    }
  };
  const { tableAttributes } = Report3PostRevenueSchema(sequelize, DataTypes)
  Report3PostRevenue.init(tableAttributes, {
    sequelize,
    modelName: 'Report3PostRevenue',
  });
  return Report3PostRevenue;
};