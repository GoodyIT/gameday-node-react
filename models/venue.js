module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    'Venue',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      team: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearOpened: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearClosed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lng: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roof: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      surface: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      orientation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      orientationDeg: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      windDirection: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'venue',
      timestamps: false,
    },
  );

  Venue.associate = db => {
    Venue.hasMany(db.Game, {
      foreignKey: 'venue_id',
      sourceKey: 'id',
    });
  };

  return Venue;
};
