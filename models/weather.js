module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define(
    'Weather',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
      cloud_cover: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      dew_point: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      feels_like: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      heat_index: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pressure_msl: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      precipitation: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pressure_tendency: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      radiation_solar_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      relative_humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      specific_humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      snowfall: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pressure: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_chill: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_direction: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_direction_80m: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_direction_100m: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_speed: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_speed_80m: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wind_speed_100m: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wet_bulb: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: 'weather',
      timestamps: false,
    },
  );

  Weather.associate = db => {
    Weather.belongsTo(db.Game, {
      foreignKey: 'weather_id',
      targetKey: 'id',
    });
  };

  return Weather;
};
