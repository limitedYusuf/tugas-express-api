module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menus', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Menu;
};
