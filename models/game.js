module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      venue_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weather_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      away_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away_record: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      home_record: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      home_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      stadium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      time_of_game: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      first_downs_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      first_downs_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_rush_attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_rush_tds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_rush_yds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_yds_per_carry: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      rush_yds_tds_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      away_rush_attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away_rush_tds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away_rush_yds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      away_yds_per_carry: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      rush_yds_tds_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passing_completion_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_yds_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_attempts_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_td_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_int_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_comp_pct_home: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cmp_att_yd_td_int_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passing_completion_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_yds_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_attempts_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_td_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_int_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passing_comp_pct_away: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cmp_att_yd_td_int_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sacked_yards_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sacked_yards_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      net_pass_yards_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      net_pass_yards_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_yards_home: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      total_yards_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fumbles_lost_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fumbles_lost_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      turnovers_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      turnovers_away: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      penalties_yards_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      penalties_yards_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      third_down_conv_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      third_down_conv_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fourth_down_conv_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fourth_down_conv_away: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      time_of_possession_home: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      time_of_possession_away: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'game',
      timestamps: false,
    },
  );

  Game.associate = db => {
    Game.belongsTo(db.Venue, {
      foreignKey: 'venue_id',
      targetKey: 'id',
    });

    Game.hasMany(db.Weather, {
      foreignKey: 'weather_id',
      targetKey: 'id',
    });
  };

  return Game;
};
