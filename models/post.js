'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.Categories, {
      foreignKey: 'CategoryId',
      as: 'category',
    });

    Post.belongsTo(models.Users, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };

  return Post;
};
