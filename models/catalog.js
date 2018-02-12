'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Catalog', {
    name: DataTypes.STRING
  });

  Model.associate = function(models){

  };

  return Model;
};