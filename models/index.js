'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//************ DB RELATIONS ************


//One to Many
db.Catalog.belongsTo(db.Company);
db.Company.hasMany(db.Catalog);

//Many to Many
db.User.belongsToMany(db.Company, {through: 'UserCompany'});
db.Company.belongsToMany(db.User, {through: 'UserCompany'});

//********* END OF DB RELATIONS ********
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
