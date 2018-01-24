'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first     : DataTypes.STRING,
    last      : DataTypes.STRING,
    email     : {type: DataTypes.STRING, allowNull: true, unique: true},
    phone     : {type: DataTypes.STRING, allowNull: true, unique: true},
    password  : DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
        beforeSave: async (user) => {
          let err, salt, hash;
          [err, salt] = await to(bcrypt.genSalt(10));
          if(err) TE(err.message, true);

          [err, hash] = await to(bcrypt.hash(user.password, salt));
          if(err) TE(err.message, true);

          user.password = hash;
        },
    },
  });

  User.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    User.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    }

  return User;
};