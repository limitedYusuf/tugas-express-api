const bcrypt = require('bcrypt');
const passportLocalSequelize = require('passport-local-sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Roles, { through: 'UserRole' });
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    passwordField: 'password',
  });

  return User;
};
