module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permissions', {
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Roles, { through: 'RoleMenuPermissions' });
  };

  return Permission;
};
