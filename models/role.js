module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
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
