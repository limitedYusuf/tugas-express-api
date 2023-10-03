module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('UserRoles', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'unique_user_role_constraint',
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'unique_user_role_constraint',
    },
  });

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
