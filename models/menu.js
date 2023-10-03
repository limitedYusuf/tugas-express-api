module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menus', {
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
  });

  return Menu;
};
