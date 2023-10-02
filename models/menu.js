module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menus', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Menu;
};
