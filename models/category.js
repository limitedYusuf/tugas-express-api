'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Post, {
      foreignKey: 'CategoryId',
      as: 'posts'
    });
  };
  return Category;
};
