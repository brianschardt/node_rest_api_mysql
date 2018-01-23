'use strict';
module.exports = (sequelize, DataTypes) => {
  var Catalog = sequelize.define('Catalog', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Catalog;
};