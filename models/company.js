'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Company', {
    name: DataTypes.STRING
  });

  Model.associate = function(models){
      this.Users = this.belongsToMany(models.User, {through: 'UserCompany'});
  };

  return Model;
};