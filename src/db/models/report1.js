'use strict';
const {
  Model
} = require('sequelize');

const Report1Schema = require('../schema/report_1')

module.exports = (sequelize, DataTypes) => {
  class Report1 extends Model {
    static associate(models) {
      Report1.Profile = this.belongsTo(models.Profile)
      Report1.Report2PreRevenue = this.hasOne(models.Report2PreRevenue)
      Report1.Report3PostRevenue = this.hasOne(models.Report3PostRevenue)
    }
  }
  const { tableAttributes } = Report1Schema(sequelize, DataTypes)
  Report1.init(tableAttributes, {
    sequelize,
    modelName: 'Report1',
  });
  return Report1;
};