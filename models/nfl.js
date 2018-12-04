module.exports = (sequelize, DataTypes) => {
  const NFL = sequelize.define(
    'NFL',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      away_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away_team: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      away_vegas: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      away_moneyline: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_team: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      home_vegas: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      home_moneyline: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      stadium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      temp: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      precip: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      humidity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dew_point: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      wind: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wind_direction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'nfl',
      timestamps: false,
    },
  );
  
  // NFL.associate = db => {
  //   NFL.belongsTo(db.Venue, {
  //     foreignKey: 'stadium',
  //     targetKey: 'name',
  //   });
  // };

  return NFL;
};
