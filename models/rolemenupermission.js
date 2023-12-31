module.exports = (sequelize, DataTypes) => {
  const RoleMenuPermission = sequelize.define('RoleMenuPermissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RoleId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER,
    PermissionId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  RoleMenuPermission.associate = (models) => {
    RoleMenuPermission.belongsTo(models.Roles, { foreignKey: 'RoleId' });
    RoleMenuPermission.belongsTo(models.Menus, { foreignKey: 'MenuId' });
    RoleMenuPermission.belongsTo(models.Permissions, { foreignKey: 'PermissionId' });
  };

  return RoleMenuPermission;
};
