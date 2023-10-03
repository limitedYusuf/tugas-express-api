module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
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
