'use strict';
const {
  Model
} = require('sequelize')

const ProfileSchema = require('../schema/profile')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.User = this.belongsTo(models.User)
    }
  }
  const { tableAttributes } = ProfileSchema(sequelize, DataTypes)
  Profile.init(tableAttributes, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};