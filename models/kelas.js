module.exports = (sequelize, DataTypes) => {
  const Kelas = sequelize.define('Kelas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun_ajaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  Kelas.associate = (models) => {
    Kelas.hasMany(models.Siswas, { foreignKey: 'kelasId', onDelete: 'CASCADE' });
  };

  return Kelas;
};
