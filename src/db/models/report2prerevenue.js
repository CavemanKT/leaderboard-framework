'use strict';
const {
  Model
} = require('sequelize');

const Report2PreRevenueSchema = require('../schema/report_2_pre_revenue')

module.exports = (sequelize, DataTypes) => {
  class Report2PreRevenue extends Model {
    static associate(models) {
      Report2PreRevenue.Report1 = this.belongsTo(models.Report1)
    }
  };
  const { tableAttributes } = Report2PreRevenueSchema(sequelize, DataTypes)
  Report2PreRevenue.init(tableAttributes, {
    sequelize,
    modelName: 'Report2PreRevenue',
  });
  return Report2PreRevenue;
};