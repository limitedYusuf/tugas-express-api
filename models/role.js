module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    name: DataTypes.STRING,
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.Users, {
      through: 'UserRoles',
      foreignKey: 'RoleId',
    });

    Role.belongsToMany(models.Menus, {
      through: 'RoleMenuPermissions',
      foreignKey: 'RoleId',
    });

    Role.belongsToMany(models.Permissions, {
      through: 'RoleMenuPermissions',
      foreignKey: 'RoleId',
    });
  };

  return Role;
};
