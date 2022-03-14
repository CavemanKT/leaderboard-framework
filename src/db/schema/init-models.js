var DataTypes = require("sequelize").DataTypes;
var _AuthenticityToken = require("./authenticity_token");
var _Profile = require("./profile");
var _Report1 = require("./report_1");
var _Report2PreRevenue = require("./report_2_pre_revenue");
var _Report3PostRevenue = require("./report_3_post_revenue");
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");

function initModels(sequelize) {
  var AuthenticityToken = _AuthenticityToken(sequelize, DataTypes);
  var Profile = _Profile(sequelize, DataTypes);
  var Report1 = _Report1(sequelize, DataTypes);
  var Report2PreRevenue = _Report2PreRevenue(sequelize, DataTypes);
  var Report3PostRevenue = _Report3PostRevenue(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    AuthenticityToken,
    Profile,
    Report1,
    Report2PreRevenue,
    Report3PostRevenue,
    SequelizeMetum,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
