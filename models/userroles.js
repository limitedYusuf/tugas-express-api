module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('UserRoles', {});

  UserRoles.associate = (models) => {
    UserRoles.belongsTo(models.Users, {
      foreignKey: 'UserId',
    });

    UserRoles.belongsTo(models.Roles, {
      foreignKey: 'RoleId',
    });
  };

  return UserRoles;
};
