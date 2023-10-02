module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswas', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    alamat: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    foto: DataTypes.STRING,
  });

  Siswa.associate = (models) => {
    Siswa.belongsTo(models.Kelas, { foreignKey: 'kelasId', onDelete: 'CASCADE' });
  };

  return Siswa;
};
